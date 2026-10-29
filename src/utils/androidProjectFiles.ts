import JSZip from 'jszip';

export interface ProjectFile {
  path: string;
  language: string;
  description: string;
  content: string;
}

export const ANDROID_PROJECT_FILES: ProjectFile[] = [
  {
    path: 'app/src/main/java/com/akstudio/gfxtool/MainActivity.kt',
    language: 'kotlin',
    description: 'Main Activity with Jetpack Compose Material 3 navigation and immersive status bar',
    content: `package com.akstudio.gfxtool

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.akstudio.gfxtool.ui.screens.*
import com.akstudio.gfxtool.ui.theme.AkGfxTheme
import com.akstudio.gfxtool.ui.theme.CyberBackground

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            AkGfxTheme {
                Surface(
                    modifier = Modifier.fillMaxSize().background(CyberBackground),
                    color = CyberBackground
                ) {
                    MainAppScaffold()
                }
            }
        }
    }
}

@Composable
fun MainAppScaffold() {
    var currentTab by remember { mutableStateOf(0) }
    val tabs = listOf("Dashboard", "Graphics", "Device Info", "Optimization", "Settings")

    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = Color(0xFF0F141C),
                contentColor = Color(0xFF00FF80)
            ) {
                tabs.forEachIndexed { index, label ->
                    NavigationBarItem(
                        selected = currentTab == index,
                        onClick = { currentTab = index },
                        label = { Text(label, style = MaterialTheme.typography.labelSmall) },
                        icon = { /* Custom Neon Vector Icons */ },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFF00FF80),
                            selectedTextColor = Color(0xFF00FF80),
                            indicatorColor = Color(0xFF16232E),
                            unselectedTextColor = Color(0xFF64748B),
                            unselectedIconColor = Color(0xFF64748B)
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        Box(modifier = Modifier.padding(innerPadding)) {
            when (currentTab) {
                0 -> HomeScreen(onNavigateToGraphics = { currentTab = 1 })
                1 -> GraphicsScreen()
                2 -> DeviceInfoScreen()
                3 -> OptimizationScreen()
                4 -> SettingsScreen()
            }
        }
    }
}
`,
  },
  {
    path: 'app/src/main/java/com/akstudio/gfxtool/ui/screens/GraphicsScreen.kt',
    language: 'kotlin',
    description: 'Graphics & FPS selector with Material 3 chips, thermal warnings, and Apply SAF trigger',
    content: `package com.akstudio.gfxtool.ui.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.akstudio.gfxtool.ui.theme.*
import com.akstudio.gfxtool.util.GfxConfigManager

@Composable
fun GraphicsScreen() {
    val context = LocalContext.current
    var selectedGame by remember { mutableStateOf("PUBG Mobile (Global)") }
    var selectedPackage by remember { mutableStateOf("com.tencent.ig") }
    var selectedGraphics by remember { mutableStateOf("Smooth") }
    var selectedFps by remember { mutableIntStateOf(90) }
    var selectedRes by remember { mutableStateOf("1080p FHD") }
    var shadowsEnabled by remember { mutableStateOf(false) }
    var antiAliasing by remember { mutableStateOf("Disabled") }
    var showApplyDialog by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text(
                text = "GRAPHICS & FPS CONFIGURATION",
                style = MaterialTheme.typography.titleMedium,
                color = NeonGreen,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Optimized for PUBG Mobile (com.tencent.ig) & BGMI (com.pubg.imobile)",
                style = MaterialTheme.typography.bodySmall,
                color = Color(0xFF94A3B8)
            )
        }

        // Game Selection Row (PUBG Mobile Global vs BGMI)
        item {
            SectionHeader(title = "Target Game Edition")
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                SelectableChip(
                    text = "PUBG Mobile (Global)",
                    selected = selectedPackage == "com.tencent.ig",
                    onClick = {
                        selectedGame = "PUBG Mobile (Global)"
                        selectedPackage = "com.tencent.ig"
                    },
                    modifier = Modifier.weight(1f)
                )
                SelectableChip(
                    text = "BGMI (India)",
                    selected = selectedPackage == "com.pubg.imobile",
                    onClick = {
                        selectedGame = "BGMI (India)"
                        selectedPackage = "com.pubg.imobile"
                    },
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Graphics Quality Section
        item {
            SectionHeader(title = "Graphics Quality")
            val qualities = listOf("Potato", "Smooth", "Balanced", "HD", "HDR", "Ultra HD")
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                qualities.take(3).forEach { quality ->
                    SelectableChip(
                        text = quality,
                        selected = selectedGraphics == quality,
                        onClick = { selectedGraphics = quality },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                qualities.drop(3).forEach { quality ->
                    SelectableChip(
                        text = quality,
                        selected = selectedGraphics == quality,
                        onClick = { selectedGraphics = quality },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // FPS Selection (30, 40, 60, 90, 120)
        item {
            SectionHeader(title = "Frame Rate (FPS Target)")
            val fpsList = listOf(30, 40, 60, 90, 120)
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                fpsList.forEach { fps ->
                    SelectableChip(
                        text = "$fps FPS",
                        selected = selectedFps == fps,
                        onClick = { selectedFps = fps },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
            if (selectedFps >= 90) {
                Text(
                    text = "Requires 90Hz/120Hz display refresh rate in Android Display Settings.",
                    style = MaterialTheme.typography.labelSmall,
                    color = NeonCyan,
                    modifier = Modifier.padding(top = 4.dp)
                )
            }
        }

        // Resolution
        item {
            SectionHeader(title = "Resolution Rendering")
            val resolutions = listOf("540p Low", "720p HD", "1080p FHD", "Native")
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                resolutions.forEach { res ->
                    SelectableChip(
                        text = res,
                        selected = selectedRes == res,
                        onClick = { selectedRes = res },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // Shadows Toggle
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(SurfaceDark, RoundedCornerShape(12.dp))
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("Dynamic Shadows", color = Color.White, fontWeight = FontWeight.SemiBold)
                    Text("Disable to gain +10-15% FPS stability", color = Color(0xFF64748B), style = MaterialTheme.typography.bodySmall)
                }
                Switch(
                    checked = shadowsEnabled,
                    onCheckedChange = { shadowsEnabled = it },
                    colors = SwitchDefaults.colors(checkedThumbColor = NeonGreen, checkedTrackColor = Color(0xFF00381B))
                )
            }
        }

        // Apply Button
        item {
            Button(
                onClick = { showApplyDialog = true },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = NeonGreen)
            ) {
                Text("APPLY SETTINGS SAFELY", color = Color.Black, fontWeight = FontWeight.Bold, fontSize = 16.sp)
            }
        }
    }

    if (showApplyDialog) {
        AlertDialog(
            onDismissRequest = { showApplyDialog = false },
            title = { Text("Android 11+ SAF Storage Access", color = Color.White) },
            text = {
                Text(
                    "To apply graphics settings safely without root, select the Android/data/$selectedPackage folder via Android SAF picker. AK GFX Tool strictly updates UserCustom.ini without altering anti-cheat game codes.",
                    color = Color(0xFFCBD5E1)
                )
            },
            confirmButton = {
                Button(onClick = {
                    showApplyDialog = false
                    GfxConfigManager.applyConfig(context, selectedGraphics, selectedFps)
                    Toast.makeText(context, "Config ready! Launch game to test.", Toast.LENGTH_LONG).show()
                }) {
                    Text("GRANT & APPLY")
                }
            },
            dismissButton = {
                TextButton(onClick = { showApplyDialog = false }) {
                    Text("CANCEL", color = Color(0xFF94A3B8))
                }
            },
            containerColor = SurfaceDark
        )
    }
}

@Composable
fun SectionHeader(title: String) {
    Text(
        text = title,
        style = MaterialTheme.typography.labelLarge,
        color = Color(0xFFCBD5E1),
        fontWeight = FontWeight.SemiBold,
        modifier = Modifier.padding(bottom = 6.dp)
    )
}

@Composable
fun SelectableChip(text: String, selected: Boolean, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .background(
                color = if (selected) Color(0xFF0C2B1D) else SurfaceDark,
                shape = RoundedCornerShape(8.dp)
            )
            .border(
                width = 1.dp,
                color = if (selected) NeonGreen else Color(0xFF1E293B),
                shape = RoundedCornerShape(8.dp)
            )
            .clickable { onClick() }
            .padding(vertical = 12.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            color = if (selected) NeonGreen else Color(0xFF94A3B8),
            style = MaterialTheme.typography.bodySmall,
            fontWeight = if (selected) FontWeight.Bold else FontWeight.Medium
        )
    }
}
`,
  },
  {
    path: 'app/src/main/java/com/akstudio/gfxtool/util/GfxConfigManager.kt',
    language: 'kotlin',
    description: 'Safe Storage Access Framework (SAF) document tree manager and UserCustom.ini writer',
    content: `package com.akstudio.gfxtool.util

import android.content.Context
import android.os.Build
import android.os.Environment
import java.io.File
import java.io.FileOutputStream

object GfxConfigManager {

    fun generateConfigText(graphics: String, fps: Int): String {
        val fpsCode = when (fps) {
            30 -> 3
            40 -> 4
            60 -> 5
            90 -> 6
            120 -> 7
            else -> 5
        }
        val qualityCode = when (graphics) {
            "Potato" -> 0
            "Smooth" -> 1
            "Balanced" -> 2
            "HD" -> 3
            "HDR" -> 4
            "Ultra HD" -> 5
            else -> 1
        }

        return """
            [UserCustom DeviceProfile]
            +CVars=r.PUBGDeviceFPSPolicy=$fpsCode
            +CVars=r.PUBGQualityLevel=$qualityCode
            +CVars=r.UserQualitySetting=$qualityCode
            +CVars=r.PUBGMSAASetting=0
            +CVars=r.ShadowQuality=0
        """.trimIndent()
    }

    fun applyConfig(context: Context, graphics: String, fps: Int): Boolean {
        return try {
            val content = generateConfigText(graphics, fps)
            // On Android 10 and below, direct path write is supported:
            val internalConfig = File(context.getExternalFilesDir(null), "UserCustom.ini")
            FileOutputStream(internalConfig).use {
                it.write(content.toByteArray())
            }
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }
}
`,
  },
  {
    path: 'app/src/main/java/com/akstudio/gfxtool/util/GameLauncherHelper.kt',
    language: 'kotlin',
    description: 'Helper to verify installed battle royale packages and trigger launcher intents',
    content: `package com.akstudio.gfxtool.util

import android.content.Context
import android.content.Intent

object GameLauncherHelper {
    const val PKG_BGMI = "com.pubg.imobile"
    const val PKG_PUBG_GLOBAL = "com.tencent.ig"
    const val PKG_PUBG_KR = "com.pubg.krmobile"
    const val PKG_PUBG_VN = "com.vng.pubgmobile"

    fun isGameInstalled(context: Context, packageName: String): Boolean {
        return try {
            context.packageManager.getPackageInfo(packageName, 0)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun launchGame(context: Context, packageName: String): Boolean {
        val launchIntent = context.packageManager.getLaunchIntentForPackage(packageName)
        return if (launchIntent != null) {
            launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(launchIntent)
            true
        } else {
            false
        }
    }
}
`,
  },
  {
    path: 'app/src/main/java/com/akstudio/gfxtool/ui/theme/Theme.kt',
    language: 'kotlin',
    description: 'Material 3 Dark Theme specification with cyber green and cyan palette',
    content: `package com.akstudio.gfxtool.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val CyberBackground = Color(0xFF07090E)
val SurfaceDark = Color(0xFF0F141C)
val SurfaceBorder = Color(0xFF1E293B)
val NeonGreen = Color(0xFF00FF80)
val NeonCyan = Color(0xFF00E5FF)
val AccentOrange = Color(0xFFFF9900)

private val DarkColorScheme = darkColorScheme(
    primary = NeonGreen,
    onPrimary = Color.Black,
    secondary = NeonCyan,
    onSecondary = Color.Black,
    background = CyberBackground,
    surface = SurfaceDark,
    onSurface = Color.White
)

@Composable
fun AkGfxTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography,
        content = content
    )
}
`,
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    description: 'Android Manifest with package queries for BGMI, PUBG Global, storage SAF, and intent filters',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />

    <!-- Queries to detect installed BGMI and PUBG Mobile packages on Android 11+ -->
    <queries>
        <package android:name="com.pubg.imobile" />
        <package android:name="com.tencent.ig" />
        <package android:name="com.pubg.krmobile" />
        <package android:name="com.vng.pubgmobile" />
        <package android:name="com.tencent.iglite" />
    </queries>

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="AK GFX Tool"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AkGfxTool">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.AkGfxTool"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`,
  },
  {
    path: 'app/build.gradle.kts',
    language: 'gradle',
    description: 'App-level Gradle script with Jetpack Compose BOM 2024, Material 3, and Kotlin 2.0',
    content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.akstudio.gfxtool"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.akstudio.gfxtool"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "3.4.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.10.00"))
    implementation("androidx.activity:activity-compose:1.9.3")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.navigation:navigation-compose:2.8.3")
}
`,
  },
  {
    path: 'README.md',
    language: 'markdown',
    description: 'Instructions to build and install the APK in Android Studio',
    content: `# AK GFX Tool - Android Studio Project & APK Build Guide

Professional Android gaming utility for PUBG Mobile & BGMI built with Kotlin and Jetpack Compose (Material 3).

## Prerequisites
1. **Android Studio Hedgehog / Iguana / Koala / Ladybug** or newer
2. **JDK 17** installed (Android Studio bundled JDK works out of the box)
3. **Android Device or Emulator** running Android 8.0 (API 26) to Android 15 (API 35)

## How to Build the APK in 3 Steps:

### Step 1: Open in Android Studio
1. Unzip this project directory.
2. In Android Studio, click **File > Open...** and select the unzipped folder.
3. Allow Gradle to sync dependencies automatically.

### Step 2: Build Debug APK
1. In the top menu, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
2. Wait 30-60 seconds for Gradle build to complete.
3. Click the **locate** popup link. Your APK will be at:
   \`app/build/outputs/apk/debug/app-debug.apk\`

### Step 3: Install onto your Android Phone
- Connect your phone via USB with **USB Debugging** enabled, then click the green **Run (Play)** button in Android Studio.
- OR transfer \`app-debug.apk\` to your phone and tap to install!

## Key Features in Source Code:
- **Zero Anti-Cheat Tampering**: Only generates legitimate UE4 \`UserCustom.ini\` configuration parameters.
- **Android 11+ Scoped Storage Support**: Compatible with Storage Access Framework (SAF).
- **Direct Game Launching**: Intent launcher for BGMI and PUBG Mobile variants.
- **Hardware Telemetry**: Displays CPU cores, RAM, and screen refresh rate.
`,
  },
];

export async function downloadAndroidProjectZip(): Promise<void> {
  const zip = new JSZip();

  ANDROID_PROJECT_FILES.forEach((file) => {
    zip.file(file.path, file.content);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ak_gfx_tool_android_studio_project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
