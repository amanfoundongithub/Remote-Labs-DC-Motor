#include <Arduino_JSON.h>
#include <HTTPClient.h>
#include <ThingSpeak.h>
#include <WiFi.h>
#include "Cipher.h"

unsigned long ChannelNumber = 1839559;
unsigned long RPMFieldNumber = 1;
unsigned long VFieldNumber = 2;
const char * myWriteAPIKey = "DG54QL8ZBGLS9Y1F";

const char* ssid = "Siddharth";
const char* password = "10203040";

const int LDR_PIN = 34;

int ENA_pin = 19;
int IN1 = 5;
int IN2 = 18;
int duty_cycle = 0;

const int LM393 = 2;
int counter = 0;

unsigned long lastGETTime = 0;
unsigned long GETTimerDelay = 1000;

unsigned long lastPOSTTime = 0;
unsigned long POSTTimerDelay = 30000;

WiFiClient client;

Cipher * cipher = new Cipher();
char * key = "abcdefghijklmnop";

float maxRPM = 269.0;
float loadVoltage = 9.0;
float offsetADCReading = 2780;
float calFactor = 0.0023;

void count() {
  counter++;
}

void getLatestCI(String cnt)
{
  HTTPClient http;
  bool isBegin = http.begin("https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-20/" + cnt + "/Data/la");
  if(isBegin){
  http.addHeader("X-M2M-Origin", "ZrZ4zY:lC8jfN");
  http.addHeader("Content-Type", "application/json");
  int code = http.GET();
  String response = http.getString();
  Serial.println(code);
  Serial.println(response);
  if (code == -1) {
    Serial.println("UNABLE TO CONNECT TO THE SERVER");
  }
  http.end();
  }
  else
    Serial.println("Couldn't begin server!!");
}

void createCI(String& val, String cnt){
  HTTPClient http;
  bool isBegin = http.begin("https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-20/" + cnt + "/Data");
  if(isBegin){
  http.addHeader("X-M2M-Origin", "ZrZ4zY:lC8jfN");
  http.addHeader("Content-Type", "application/json;ty=4");
  String PostReq = "{\"m2m:cin\": {\"con\": \"" + String(val) + "\"}}"; 
  Serial.println(PostReq);
  int code = http.POST(PostReq);
  Serial.println(code);
  if (code == -1) {
    Serial.println("UNABLE TO CONNECT TO THE SERVER");
  }
  http.end();
  }
  else
    Serial.println("Couldn't begin server!!");
}

void PostSensorReadings() {
  if ((millis() - lastPOSTTime) > POSTTimerDelay) {
    float voltage = readVoltage();
    float RPM = (float) (counter/20.0);
    counter = 0;
    float idealRPM = maxRPM * voltage / loadVoltage;
    float error = abs(idealRPM - RPM)* 100 / idealRPM;
    Serial.print("RPM: ");
    Serial.println(RPM);

    if(error < 20.0)
    {
      // Upload to ThingSpeak
      ThingSpeak.setField(RPMFieldNumber,RPM);
      ThingSpeak.setField(VFieldNumber, voltage);
      int x = ThingSpeak.writeFields(ChannelNumber, myWriteAPIKey);
  
      // Upload to OneM2M
      String RPMVal = String(RPM);
      String VoltageVal = String(voltage);
      createCI(RPMVal, "Node-1");
      getLatestCI("Node-1");
      createCI(VoltageVal, "Node-2");
      getLatestCI("Node-2");

      // Upload encrypted data to OneM2M
      String encryptedRPMVal = cipher->encryptString(RPMVal);
      String encryptedVoltageVal = cipher->encryptString(VoltageVal);
      createCI(encryptedRPMVal, "Encrypted-Node-1");
      getLatestCI("Encrypted-Node-1");
      createCI(encryptedVoltageVal, "Encrypted-Node-2");
      getLatestCI("Encrypted-Node-2");
  
      Serial.print("Encrypted RPM: ");
      Serial.println(cipher->encryptString(RPMVal));
  
      Serial.print("Encrypted Voltage : ");
      Serial.println(cipher->encryptString(VoltageVal));
      
      lastPOSTTime = millis();
    }
    else
    {
      Serial.println("Noise value detected");
      delay(1000);
    }
  }
}

const int frequency = 500;
const int pwm_channel = 0;
const int resolution = 8;

float readVoltage() {
  float val = 0.0;
  for(int i = 0 ; i < 1000 ; i++)
  {
    val += analogRead(LDR_PIN);
    delay(2);
  }
  return ((val / 1000.0) - offsetADCReading)*calFactor;
}

void setup(){
  attachInterrupt(digitalPinToInterrupt(LM393), count, RISING);
  Serial.begin(115200);
  delay(1000);
  pinMode(ENA_pin, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);

  ledcSetup(pwm_channel, frequency, resolution);
  ledcAttachPin(ENA_pin, pwm_channel);
  ledcWrite(pwm_channel, duty_cycle);
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println(WiFi.localIP());
  ThingSpeak.begin(client);

  cipher->setKey(key);
}

void getPWM()
{
  if ((millis() - lastGETTime) > GETTimerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      String serverPath = "https://api.thingspeak.com/channels/1848204/fields/1.json?api_key=OXJRK2EW4FCQLWCB&results=1";
      
      // Your Domain name with URL path or IP address with path
      http.begin(serverPath.c_str());
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP GET Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        JSONVar obj = JSON.parse(payload);
        String pwmVal = JSON.stringify(obj["feeds"][0]["field1"]);
        pwmVal.remove(0,1);
        pwmVal.remove(pwmVal.length() - 1,1);
        duty_cycle = pwmVal.toInt();
        Serial.print("PWM: ");
        Serial.println(duty_cycle);
        ledcWrite(pwm_channel, duty_cycle);
        digitalWrite(IN1, HIGH);
        digitalWrite(IN2, LOW);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastGETTime = millis();
  }
}
  
void loop() {
  getPWM();
  PostSensorReadings();
  
}
