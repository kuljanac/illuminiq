#include <ESP8266WiFi.h>

const char* ssid = "5G";
const char* password = "12345678";
const IPAddress ip(192, 168, 4, 1);
WiFiServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(ip, ip, IPAddress(255, 255, 255, 0));
  WiFi.softAP(ssid, password);
  server.begin();
  Serial.print("Access Point \"");
  Serial.print(ssid);
  Serial.println("\" started");
  Serial.print("IP address:\t");
  Serial.println(WiFi.softAPIP());
  while (!Serial) {
  ; // wait for serial port to connect. Needed for native USB port only
}
}

void loop() {
  WiFiClient client = server.available();
  if (client) {
    Serial.println("New client connected");
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("");
    client.println("<!DOCTYPE html><html><head><title>Hello, Mislav!</title></head><body><h1>Hello, World!</h1></body></html>");
    delay(10);
    client.stop();
    Serial.println("Client disconnected");
    if (Serial.available()) {
      Serial.write(Serial.read());
    }
  }
}
