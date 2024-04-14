#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define DHTPIN 5     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11

const char* ssid = "device";
const char* password = "12345678";
const char* serverUrl = "https://adsds-d13a7574abf3.herokuapp.com/environmentalData"; // Update the endpoint URL

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("DHTxx test!");

  dht.begin();

  connectToWiFi();
}

void loop() {
  delay(2000); // Wait a few seconds between measurements.

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print("% Temperature: ");
  Serial.print(temperature);
  Serial.println("°C");

  sendEnvironmentalDataToServer(humidity, temperature);
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void sendEnvironmentalDataToServer(float humidity, float temperature) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  // Format the JSON payload with humidity and temperature values
  String requestBody = "{\"humidity\": " + String(humidity) + ", \"temperature\": " + String(temperature) + "}";

  int httpResponseCode = http.POST(requestBody);
  if (httpResponseCode > 0) {
    Serial.println("Environmental data sent successfully");
  } else {
    Serial.print("Error sending environmental data: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}
