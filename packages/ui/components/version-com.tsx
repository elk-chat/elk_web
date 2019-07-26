/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import { ShowModal } from 'ukelli-ui/core/modal';
import { TipPanel } from 'ukelli-ui/core/tip-panel';
import { Notify } from 'ukelli-ui/core/notification';

interface VersionCheckerProps {
  /** 版本内容 */
  versionInfo: {
    numberVersion: string;
    updateLog: string;
  };
  versionUrl?: string;
}

interface VersionDisplayerProps extends VersionCheckerProps {
}

class VersionChecker extends Component<VersionCheckerProps> {
  constructor(props) {
    super(props);

    let { numberVersion } = props.versionInfo;

    window.__VERSION = props.versionInfo;

    numberVersion = numberVersion.trim();
    this.errorCount = 0;

    this.state = {
      currVersion: numberVersion,
      lastVersion: numberVersion,
    };
  }

  componentDidMount() {
    this.getVersion();
    this.timer = setInterval(this.getVersion, 30 * 60 * 1000);
  }

  componentWillUnmount() {
    this.__unmount = true;
    this._clear();
  }

  _clear = () => {
    this.timer && clearInterval(this.timer);
  };

  getVersion = () => {
    const { versionUrl } = this.props;
    if (!versionUrl) return console.log('请设置版本文件地址 versionUrl');
    if (this.errorCount === 5) return this._clear();
    fetch(`${versionUrl}?t=${Date.now()}`)
      .then(res => res.json())
      .then((remoteVersion) => {
        let { numberVersion, updateLog } = remoteVersion;
        numberVersion = numberVersion.trim();
        if (numberVersion != this.state.lastVersion) {
          this._clear();
          Notify({
            config: {
              text: '有新的系统版本',
              title: '系统通知',
              type: 'success',
              lifecycle: 0,
              onClickTip: (e) => {
                this.reload();
              },
              actionText: '更新',
            }
          });
          !this.__unmount && this.setState({
            lastVersion: numberVersion,
            updateLog
          });
        }
      })
      .catch((e) => {
        this.errorCount++;
      });
  };

  reload = () => {
    const { updateLog, lastVersion } = this.state;
    ShowModal({
      title: '是否更新版本？',
      type: 'confirm',
      width: 400,
      confirmText: (
        <div>
          <div>
            <h4>更新内容:</h4>
            <p>{updateLog || '日常更新'}</p>
          </div>
          <hr />
          <TipPanel
            type="success"
            text="请确保已保存工作内容，页面即将刷新" />
        </div>
      ),
      onConfirm: (isSure) => {
        if (isSure) {
          location.reload();
        }
      },
    });
  }

  render() {
    return <span />;
  }
}

const VersionDisplayer: React.SFC<VersionDisplayerProps> = (props) => {
  const { versionInfo } = props;
  return (
    <div className="version-container">
      <div>
        客户端版本 {versionInfo.numberVersion}
      </div>
    </div>
  );
};

export {
  VersionChecker
};

export default VersionDisplayer;
