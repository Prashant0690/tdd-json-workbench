package org.example;

import org.example.model.RequestResponse;
import org.example.testData.KlarnaApiAutomation;
import org.example.testData.OpenWeatherApiAutomation;
import org.example.testData.SmartAPIAutomation;
import org.example.util.SeleniumUtils;

public class GeneralTest {

    public static void main(String[] args) {
        ApiAutomation automation = new ApiAutomation();
        automation.openApplication("http://localhost:3000");
        //automation.openApplication("https://prashant0690.github.io/tdd-json-workbench/");

        try {
            OpenWeatherApiAutomation.runOpenWeatherApiTests(automation);
            automation.toggleTheme();
            SmartAPIAutomation.runSmartApiTests(automation);

        } catch (Exception e) {
            System.out.println("An error occurred during execution.");
            e.printStackTrace();
        } finally {
            // Close the application
            automation.closeApplication();
        }
    }


}