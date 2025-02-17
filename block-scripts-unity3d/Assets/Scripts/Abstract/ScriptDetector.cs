using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace DetectScripts{

    public abstract class ScriptDetector : MonoBehaviour{

        private Dictionary<string, string> scriptsDetected = new Dictionary<string, string>();

        public void AddScriptDetected(string scriptName, string scriptContent)
        {
            scriptsDetected[scriptName] = scriptContent;
        }

        public Dictionary<string, string> GetScriptsDetected()
        {
            return scriptsDetected;
        }
        
        public abstract void DetectScripts();

    }

}