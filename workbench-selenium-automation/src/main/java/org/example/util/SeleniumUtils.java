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
package org.example.util;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.time.Duration;

public class SeleniumUtils {

    public static int count = 0;

    public static void scrollToElement(WebDriver driver, WebElement element) {
        log("Scrolling to element: " + element.toString());
        ((JavascriptExecutor) driver).executeScript(
                "var viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);" +
                        "var elementTop = arguments[0].getBoundingClientRect().top;" +
                        "window.scrollBy(0, elementTop - (viewPortHeight / 2));", element);
        waitForHalfSeconds();
    }

    public static void waitForSeconds(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static void waitForHalfSeconds() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public static void clickElementUsingJS(WebDriver driver, WebElement element) {
        log("Clicking element using JS: " + element.toString());
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element);
        waitForHalfSeconds();
    }

    public static void handleAlert(WebDriver driver, WebDriverWait wait) {
        try {
            log("Handling alert if present");
            waitForHalfSeconds();
            WebDriverWait shortWait = new WebDriverWait(driver, Duration.ofSeconds(1));
            shortWait.until(ExpectedConditions.alertIsPresent()).accept();
            System.out.println("Alert accepted");
        } catch (Exception e) {
            System.out.println("No alert present or alert dismissed");
        }
    }

    public static void takeScreenshot(WebDriver driver, String fileName) {
        File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        try {
            FileUtils.copyFile(screenshot, new File(fileName));
            System.out.println("Screenshot saved as: " + fileName);
        } catch (IOException e) {
            System.out.println("Error saving screenshot: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void takeScreenshot(WebDriver driver) {
        File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        String fileName = "./screenshots/image" + count;
        try {
            FileUtils.copyFile(screenshot, new File(fileName));
            System.out.println("Screenshot saved as: " + fileName);
            count = count + 1;
        } catch (IOException e) {
            System.out.println("Error saving screenshot: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void log(String message) {
        System.out.println(System.currentTimeMillis() + ": " + message);
    }
}