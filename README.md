# PlotPlotPlot

A simple multi-channel serial plot tool for Arduino

# Format

The format is very simple:
`\031plotKey\031plotValue\n`

The ASCII unit separator `\031` is used to split the key and value of the plot. This control character is used instead of spaces, commas, etc so that they do not conflict with the value of the data and require complicated escaping rules.

Anything else written to the console is considered diagnostic log and will not be plotted.

# Example
Using the following Arduino sketch:
```
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  int currentTemp = random(22, 45);
  Serial.print("\031Temp\031");
  Serial.println(currentTemp);

  int currentPosition = random(0, 255);  
  Serial.print("\031Position\031");
  Serial.println(currentPosition);

  delay(1000);
}
```

Results the following printed to the serial port:
```
Position44
Temp22.00
Position44
Temp22.00
```

![Demo](https://raw.githubusercontent.com/i386/plotplotplot/master/demo.gif)
