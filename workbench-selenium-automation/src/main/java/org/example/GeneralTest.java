/*
TDD-JSON-Workbench
Copyright (C) 2023 Prashant Tiwari

This program is a personal project and free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
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