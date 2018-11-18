
/*
Based on a demo of particleSensor Max30105
This was made by Gala, part of the team Moodable
*/
#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <SoftwareSerial.h>

SoftwareSerial moodable(10, 11); // RX, TX
MAX30105 particleSensor;

void setup()
{
  moodable.begin(9600);
  moodable.println("Initializing");
  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) 
  {
    moodable.println("E01");
    while (1);
  }
  moodable.println("W01");

  particleSensor.setup(); 
  particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED
}

void loop()
{
  long irValue = particleSensor.getIR();

  if (checkForBeat(irValue) == true)
  {
    moodable.write("Beat");
  }else{
    if (irValue < 50000){
     moodable.println("E02");
     delay(300);
    }else
      moodable.println("NoBeat");
  }
}
/*
Errors....
  E01: No se detecta ninguna pulsera
  E02: Pulsera no esta en uso
Warnings....
  W01: Mucho movimento, es dificil captar latidos
*/
