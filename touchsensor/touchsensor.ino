#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "device";
const char* password = "12345678";
const char* serverUrl = "https://adsds-d13a7574abf3.herokuapp.com/stepCount";

const int TOUCH_PIN = 4; // Replace with the actual GPIO pin connected to the TTP223 sensor

void setup() {
  Serial.begin(115200);
  pinMode(TOUCH_PIN, INPUT);
  connectToWiFi();
}

void loop() {
  if (touchDetected()) {
    sendStepCountToServer();
    delay(1000); // Add a delay to avoid sending multiple requests for a single touch event
  }
  // Other loop logic
}

bool touchDetected() {
  int touchPinState = digitalRead(TOUCH_PIN);
  return (touchPinState == HIGH);
}

void connectToWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void sendStepCountToServer() {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  String requestBody = "{\"steps\": 1}";
  int httpResponseCode = http.POST(requestBody);
  if (httpResponseCode > 0) {
    Serial.println("Step count data sent successfully");
  } else {
    Serial.print("Error sending step count data: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}
