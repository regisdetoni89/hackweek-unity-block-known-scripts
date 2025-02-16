using System.Collections.Generic;
using System.Text;
using UnityEngine;
using System.Security.Cryptography;

namespace DetectScripts{

    public struct ScriptStatus{
        public string sha256;
        public bool isMalicious;
        public bool exist;
    }

    public class DetectScriptsManager : MonoBehaviour{

        public ScriptDetector[] scriptDetectors;

        public GameObject blockInteraction;

        void Start()
        {
            DetectScripts();
        }

        void DetectScripts()
        {
            foreach (var detector in scriptDetectors){
                detector.DetectScripts();
                Dictionary<string, string> scripts = detector.GetScriptsDetected();
                foreach (var script in scripts){
                    ScriptStatus status = GetScriptStatus(script.Value);
                    if(status.isMalicious){
                        blockInteraction.SetActive(true);
                        Debug.Log("Malicious script detected: " + script.Key);
                    }
                }
            }
        }

        ScriptStatus GetScriptStatus(string scriptValue){
            string sha256Script = sha256(scriptValue);
            ScriptStatus scriptStatus = GetStatusFromServer(sha256Script);
            return scriptStatus;
        }

        ScriptStatus GetStatusFromServer(string sha256Script){
            ScriptStatus status = new ScriptStatus();
            status.sha256 = sha256Script;
            status.isMalicious = true;
            status.exist = true;
            return status;
        }

        public string sha256(string randomString){
            var crypt = new SHA256Managed();
            var hash = new StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(randomString));
            foreach (byte theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString();
        }

    }


}
