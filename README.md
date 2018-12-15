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
  // put your main code here, to run repeatedly:
  Serial.println("\031Temp\03122.00");
  Serial.println("\031Position\03144");
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
