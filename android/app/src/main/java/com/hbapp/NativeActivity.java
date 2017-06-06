package com.hbapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class NativeActivity extends AppCompatActivity {

  private NativeActivity act;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_native);

    Button btn = (Button) this.findViewById(R.id.openBtn);
    btn.setOnClickListener(clickListener);
    act = this;
  }

  View.OnClickListener clickListener = new View.OnClickListener() {
    @Override
    public void onClick(View v) {
      Intent react = new Intent(act, MainActivity.class);
      react.putExtra("routeName", "login");
      startActivity(react);
      finish();
    }
  };
}
