@echo off
"C:\\Users\\5upvi\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\cmake.exe" ^
  "-HC:\\Users\\5upvi\\OneDrive\\Desktop\\SerAp\\srvapp\\node_modules\\react-native\\ReactAndroid\\cmake-utils\\default-app-setup" ^
  "-DCMAKE_SYSTEM_NAME=Android" ^
  "-DCMAKE_EXPORT_COMPILE_COMMANDS=ON" ^
  "-DCMAKE_SYSTEM_VERSION=24" ^
  "-DANDROID_PLATFORM=android-24" ^
  "-DANDROID_ABI=x86" ^
  "-DCMAKE_ANDROID_ARCH_ABI=x86" ^
  "-DANDROID_NDK=C:\\Users\\5upvi\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125" ^
  "-DCMAKE_ANDROID_NDK=C:\\Users\\5upvi\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125" ^
  "-DCMAKE_TOOLCHAIN_FILE=C:\\Users\\5upvi\\AppData\\Local\\Android\\Sdk\\ndk\\26.1.10909125\\build\\cmake\\android.toolchain.cmake" ^
  "-DCMAKE_MAKE_PROGRAM=C:\\Users\\5upvi\\AppData\\Local\\Android\\Sdk\\cmake\\3.22.1\\bin\\ninja.exe" ^
  "-DCMAKE_LIBRARY_OUTPUT_DIRECTORY=C:\\Users\\5upvi\\OneDrive\\Desktop\\SerAp\\srvapp\\android\\app\\build\\intermediates\\cxx\\Debug\\185z6q4n\\obj\\x86" ^
  "-DCMAKE_RUNTIME_OUTPUT_DIRECTORY=C:\\Users\\5upvi\\OneDrive\\Desktop\\SerAp\\srvapp\\android\\app\\build\\intermediates\\cxx\\Debug\\185z6q4n\\obj\\x86" ^
  "-DCMAKE_BUILD_TYPE=Debug" ^
  "-DCMAKE_FIND_ROOT_PATH=C:\\Users\\5upvi\\OneDrive\\Desktop\\SerAp\\srvapp\\android\\app\\.cxx\\Debug\\185z6q4n\\prefab\\x86\\prefab" ^
  "-BC:\\Users\\5upvi\\OneDrive\\Desktop\\SerAp\\srvapp\\android\\app\\.cxx\\Debug\\185z6q4n\\x86" ^
  -GNinja ^
  "-DPROJECT_BUILD_DIR=C:\\Users\\5upvi\\OneDrive\\Desktop\\SerAp\\srvapp\\android\\app\\build" ^
  "-DREACT_ANDROID_DIR=C:\\Users\\5upvi\\OneDrive\\Desktop\\SerAp\\srvapp\\node_modules\\react-native\\ReactAndroid" ^
  "-DANDROID_STL=c++_shared" ^
  "-DANDROID_USE_LEGACY_TOOLCHAIN_FILE=ON"
