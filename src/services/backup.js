import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';

export const backupDB = async () => {
  const path = `${RNFS.DocumentDirectoryPath}/locas.db`;

  await Share.open({
    url: 'file://' + path,
  });
};

export const restoreDB = async () => {
  const file = await DocumentPicker.pickSingle();

  await RNFS.copyFile(
    file.uri,
    `${RNFS.DocumentDirectoryPath}/locas.db`
  );

  alert("Restored!");
};