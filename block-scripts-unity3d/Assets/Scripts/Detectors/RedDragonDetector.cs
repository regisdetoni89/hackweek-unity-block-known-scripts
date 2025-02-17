using System.IO;
using System;
using UnityEngine;

namespace DetectScripts{

    public class RedDragonDetector : ScriptDetector{

        public override string GetSource(){
            return "RedDragon";
        }

        public override void DetectScripts(){
            ReadScriptFiles();
        }

        public void ReadScriptFiles(){
            string redDragonFolder = GetRedDragonMacroFolder();
            if(Directory.Exists(redDragonFolder) == false){
                return;
            }
            string[] files = GetAllMacroFilesInsideFolder(redDragonFolder);
            foreach (string file in files){
                string luaContent = File.ReadAllText(file);
                AddScriptDetected(file, luaContent);
            }
        }

        public string[] GetAllMacroFilesInsideFolder(string folder){
            if(Directory.Exists(folder) == false){
                return new string[0];
            }
            return Directory.GetFiles(folder, "*.MSMACRO", SearchOption.AllDirectories);
        }
        public string GetUserFolderAppDataLocal(){
            return Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
        }

        public string GetRedDragonMacroFolder(){
            return Path.Combine(GetUserFolderAppDataLocal(), "REDRAGON Gaming Mouse", "MacroDB");
        }

    }

}