using System.Collections.Generic;
using System.Text;
using UnityEngine;
using System.Security.Cryptography;

using System.Net.Http;
using System.Threading.Tasks;

using Newtonsoft.Json;

namespace DetectScripts{

    public struct ScriptStatus{
        public string sha256;
        public bool isMalicious;
        public bool exist;
    }

    public class DetectScriptsManager : MonoBehaviour{

        public ScriptDetector[] scriptDetectors;

        public string serverEndpoint = "http://localhost:3000/api/scripts/";

        public GameObject blockInteraction;

        private HttpClient client = new HttpClient();

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
                    CheckForMaliciousScript(script.Key, script.Value);
                }
            }
        }

        async void CheckForMaliciousScript(string scriptName, string scriptValue){
            ScriptStatus status = await GetScriptStatus(scriptValue);
            if(status.isMalicious){
                blockInteraction.SetActive(true);
                Debug.Log("Malicious script detected: " + scriptName);
            }
        }

        async Task<ScriptStatus> GetScriptStatus(string scriptValue){
            string sha256Script = sha256(scriptValue);
            ScriptStatus scriptStatus = await GetStatusFromServer(sha256Script);
            return scriptStatus;
        }

        async Task<ScriptStatus> GetStatusFromServer(string sha256Script){
            ScriptStatus status = new ScriptStatus();
            HttpResponseMessage response = await client.GetAsync(serverEndpoint + sha256Script);
            if (response.IsSuccessStatusCode)
            {
                string statusJsonString = await response.Content.ReadAsStringAsync();
                status = JsonConvert.DeserializeObject<ScriptStatus>(statusJsonString);
            }
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
