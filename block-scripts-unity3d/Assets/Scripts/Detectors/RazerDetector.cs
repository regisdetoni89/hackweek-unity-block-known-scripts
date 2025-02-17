using System.IO;
using System;
using UnityEngine;

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
            if(Directory.Exists(folder+"\\Emily3\\Macros\\")){
                return Directory.GetFiles(folder+"\\Emily3\\Macros\\", "*.xml", SearchOption.AllDirectories);
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