using System.Collections.Generic;
using UnityEngine;

namespace DetectScripts
{

    public class DetectScriptsManager : MonoBehaviour
    {

        public ScriptDetector[] scriptDetectors;

        void Start()
        {
            DetectScripts();
        }

        void DetectScripts()
        {
            foreach (var detector in this.scriptDetectors)
            {
                detector.DetectScripts();
                Dictionary<string, string> scripts = detector.GetScriptsDetected();
            }
        }
    }


}
