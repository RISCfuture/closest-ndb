echo "* Hard reset of deploy branch"
pushd deploy || exit
git fetch
git checkout deploy
git reset --hard origin/deploy
popd || exit

echo "* Compiling"
yarn build
echo "* Copying to deploy branch"
rsync -rv --delete --exclude=".git" --force dist/ deploy/

pushd deploy || exit
echo "* Committing deploy"
git add -A
git commit -m "Deploy by $USER"
echo "* Pushing deploy"
git push
popd || exit
