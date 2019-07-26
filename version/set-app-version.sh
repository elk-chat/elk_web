#!/bin/sh

# git checkout -f

git log --pretty=oneline > log.txt

rm -f packages/ui/version.json
cp -f version/version-template.json packages/ui/version.json

rm -f public/version.json
touch public/version.json

DATE=`date  +%Y%m%d%H%M%S`
git_ver=`awk 'NR==1 {print $1}' log.txt`
num_ver=`awk 'END{print NR}' log.txt`
app_ver=$num_ver"-"$DATE
upd_log=`cat version/update-log.txt | tr "\n" "~" | tr "\r" "~" | tr "\0" "~"`
echo '#######'$upd_log
sed -i '' -e 's/NUMBER_VERSION_FORNOW/'$num_ver'/g' packages/ui/version.json
sed -i '' -e 's/UPDATE_LOG_FORNOW/'$upd_log'/g' packages/ui/version.json

# 把 version 文件放到 public 中，提供版本升级通知
cp packages/ui/version.json public/version.json

echo "App version: $app_ver"
echo "Num Version: $num_ver"
echo "Git Version: $git_ver"
