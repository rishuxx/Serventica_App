@echo off
"C:\\Program Files\\Java\\jdk-23\\bin\\java" ^
  --class-path ^
  "C:\\Users\\5upvi\\.gradle\\caches\\modules-2\\files-2.1\\com.google.prefab\\cli\\2.1.0\\aa32fec809c44fa531f01dcfb739b5b3304d3050\\cli-2.1.0-all.jar" ^
  com.google.prefab.cli.AppKt ^
  --build-system ^
  cmake ^
  --platform ^
  android ^
  --abi ^
  x86_64 ^
  --os-version ^
  24 ^
  --stl ^
  c++_shared ^
  --ndk-version ^
  26 ^
  --output ^
  "C:\\Users\\5upvi\\AppData\\Local\\Temp\\agp-prefab-staging3721877390915105265\\staged-cli-output" ^
  "C:\\Users\\5upvi\\.gradle\\caches\\8.10.2\\transforms\\e7a87e28456e3cd3dea6e54dbe4d1714\\transformed\\react-android-0.76.3-debug\\prefab" ^
  "C:\\Users\\5upvi\\OneDrive\\Desktop\\SerAp\\srvapp\\android\\app\\build\\intermediates\\cxx\\refs\\react-native-reanimated\\4w6s1o49" ^
  "C:\\Users\\5upvi\\.gradle\\caches\\8.10.2\\transforms\\c7c01c5ba719d9104e6a8f76c2e0feba\\transformed\\hermes-android-0.76.3-debug\\prefab" ^
  "C:\\Users\\5upvi\\.gradle\\caches\\8.10.2\\transforms\\8b60b4f75564ac53567672df7a1c9a73\\transformed\\fbjni-0.6.0\\prefab"
