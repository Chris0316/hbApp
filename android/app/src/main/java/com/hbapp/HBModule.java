package com.hbapp;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by kim on 2017/6/6.
 */

public class HBModule extends ReactContextBaseJavaModule {

  public HBModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  public String getName() {
    return "HB";
  }

  @ReactMethod
  public void startActivity(String name, final Promise promise) {
    try {

      Activity currentActivity = getCurrentActivity();

      if (null != currentActivity) {

        Class aimActivity = Class.forName(name);

        Intent intent = new Intent(currentActivity, aimActivity);

        currentActivity.startActivity(intent);
        promise.resolve(null);
      }
    } catch (Exception e) {
      Log.e("HBModule", "Could not open the activity : " + e.getMessage());
      promise.reject(e);
    }
  }

  @ReactMethod
  public void getDataFromIntent(String key, Callback success, Callback error) {
    try {
      Activity currentActivity = getCurrentActivity();
      String result = currentActivity.getIntent().getStringExtra(key);
      if (TextUtils.isEmpty(result)) {
        result = "No Data";
      }
      success.invoke(result);
    } catch (Exception e) {
      Log.e("HBModule", e.getMessage());
      error.invoke(e);
    }
  }
}
