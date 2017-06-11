package com.hbapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.beefe.picker.PickerViewPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.remobile.toast.RCTToastPackage;
import com.richardcao.exceptionsmanager.react.ExceptionsManager;
import com.tencent.bugly.crashreport.CrashReport;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import cn.reactnative.modules.update.UpdateContext;
import cn.reactnative.modules.update.UpdatePackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSBundleFile() {
      return UpdateContext.getBundleUrl(MainApplication.this);
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new PickerViewPackage(),
              new RCTCameraPackage(),
              new UpdatePackage(),
              new RCTToastPackage(),
              new RNDeviceInfo(),
              new HBPackage()
      );
      ArrayList<ReactPackage> packageList = new ArrayList<>(packages);
      if (!BuildConfig.DEBUG) {
        packageList.add(new ExceptionsManager());
      }
      return packageList;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (!BuildConfig.DEBUG) {
      CrashReport.initCrashReport(getApplicationContext(), "900019562", false);
    }
  }
}
