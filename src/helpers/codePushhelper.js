import CodePush from 'react-native-code-push';

CodePush.sync({
  updateDialog: {
    appendReleaseDescription: true,
    descriptionPrefix: '\n\nChange log:\n',
  },
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
});
CodePush.checkForUpdate().then(update => {
  if (!update) {
    console.log('The app is up to date!');
  } else {
    console.log('An update is available! Should we download it?');
  }
});
CodePush.getCurrentPackage().then(update => {
  // If the current app "session" represents the first time
  // this update has run, and it had a description provided
  // with it upon release, let's show it to the end user
  if (update.isFirstRun && update.description) {
    // Display a "what's new?" modal
  }
});
