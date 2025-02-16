using System.IO;
using System;

namespace DetectScripts
{

    public class GhubDetector : ScriptDetector
    {

        public override void DetectScripts(){
            ReadScriptFiles();
        }

        public void ReadScriptFiles(){
            string[] scriptFolders = GetScriptFolders();
            foreach (string folder in scriptFolders){
                string[] luaFiles = GetAllLuaFilesInsideFolder(folder);
                foreach (string luaFile in luaFiles){
                    string luaContent = File.ReadAllText(luaFile);
                    AddScriptDetected(luaFile, luaContent);
                }
            }
        }

        public string[] GetAllLuaFilesInsideFolder(string folder){
            return Directory.GetFiles(folder, "*.lua", SearchOption.AllDirectories);
        }

        public string GetUserFolderAppDataLocal(){
            return Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        }

        public string GetGHubScriptsFolder(){
            return Path.Combine(GetUserFolderAppDataLocal(), "LGHUB", "scripts");
        }

        public string[] GetScriptFolders(){
            string scriptFolder = GetGHubScriptsFolder();
            return Directory.GetDirectories(scriptFolder, "*", SearchOption.TopDirectoryOnly);
        }

    }
}