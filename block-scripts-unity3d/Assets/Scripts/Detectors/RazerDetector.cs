using System.IO;
using System;
using UnityEngine;
using Unity.VisualScripting;

namespace DetectScripts{

    public class RazerDetector : ScriptDetector{

        public override void DetectScripts(){
            ReadScriptFiles();
        }

        public void ReadScriptFiles(){
            string[] accountsfolders = GetAccountsFolders();
            foreach (string folder in accountsfolders){
                string[] xmlFiles = GetAllXMLFilesInsideMacroFolder(folder);
                foreach (string filePath in xmlFiles){
                    string content = File.ReadAllText(filePath);
                    AddScriptDetected(filePath, content);
                }
            }
        }

        public string[] GetAllXMLFilesInsideMacroFolder(string folder){
            string folderFullMacroPath = Path.Combine(folder, "Emily3", "Macros");
            if(Directory.Exists(folderFullMacroPath)){
                return Directory.GetFiles(folderFullMacroPath, "*.xml", SearchOption.AllDirectories);
            }
            return new string[0];
        }

        public string GetUserFolderCommonApplicationData(){
            return Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData);
        }

        public string GetRazerAccountsFolder(){
            return Path.Combine(GetUserFolderCommonApplicationData(), "Razer", "Razer Central", "Accounts");
        }

        public string[] GetAccountsFolders(){
            string scriptFolder = GetRazerAccountsFolder();
            return Directory.GetDirectories(scriptFolder, "*", SearchOption.TopDirectoryOnly);
        }

    }

}