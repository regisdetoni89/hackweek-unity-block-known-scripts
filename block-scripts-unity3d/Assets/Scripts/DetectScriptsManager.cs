using System.Collections.Generic;
using System.Text;
using UnityEngine;
using System.Security.Cryptography;

using System.Net.Http;
using System.Threading.Tasks;

using Newtonsoft.Json;
using System;

namespace DetectScripts{

    public struct ScriptStatus{
        public string sha256;
        public bool isMalicious;
        public bool exist;
        public bool verified;
    }

    public struct ScriptContentDto{
        public string hash;
        public string content;
    }

    public class DetectScriptsManager : MonoBehaviour{

        public ScriptDetector[] scriptDetectors;

        public string serverEndpoint = "http://localhost:3000/api/scripts/";

        public GameObject blockInteraction;

        private HttpClient client = new HttpClient();

        private Dictionary<string, ScriptStatus> cachedScripts = new Dictionary<string, ScriptStatus>();

        void Start(){
            DetectScripts();
        }

        void DetectScripts(){
            foreach (var detector in scriptDetectors){
                detector.DetectScripts();
                Dictionary<string, string> scripts = detector.GetScriptsDetected();
                foreach (var script in scripts){
                    CheckForMaliciousScript(script.Key, script.Value);
                }
            }
        }

        async void CheckForMaliciousScript(string scriptName, string scriptValue){
            try{
                string sha256Script = GetSha256FromString(scriptValue);
                ScriptStatus status = await GetScriptStatus(sha256Script);
                if(status.isMalicious){
                    blockInteraction.SetActive(true);
                    Debug.Log("Malicious script detected: " + scriptName);
                }
                if(!status.exist){
                    await SendToServerFullScriptToInvestigate(sha256Script, scriptValue);
                }
            }catch(HttpRequestException e){
                Debug.Log("Error: " + e.Message);
            }
        }

        async Task SendToServerFullScriptToInvestigate(string sha256Script, string scriptValue){
            var script = new ScriptContentDto();
            script.hash = sha256Script;
            script.content = scriptValue;
            string contentJson = JsonConvert.SerializeObject(script);
            var content = new StringContent(contentJson, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await client.PostAsync(serverEndpoint, content);
            if (response.IsSuccessStatusCode){
                Debug.Log("Script sent to server to investigate");
                Debug.Log(await response.Content.ReadAsStringAsync());
            }
        }

        async Task<ScriptStatus> GetScriptStatus(string sha256Script){
            if(cachedScripts.ContainsKey(sha256Script)){
                return cachedScripts[sha256Script];
            }
            return await GetStatusFromServer(sha256Script);
        }

        async Task<ScriptStatus> GetStatusFromServer(string sha256Script){
            ScriptStatus status = new ScriptStatus();
            HttpResponseMessage response = await client.GetAsync(serverEndpoint + sha256Script);
            if (response.IsSuccessStatusCode)
            {
                string statusJsonString = await response.Content.ReadAsStringAsync();
                status = JsonConvert.DeserializeObject<ScriptStatus>(statusJsonString);
                if(status.verified){
                    cachedScripts.Add(sha256Script, status);
                }
            }
            return status;
        }

        public string GetSha256FromString(string randomString){
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
