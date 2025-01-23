<!DOCTYPE html>
<html lang="en">

<head>
  
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="public/img/dummy_images/favicon_io/favicon.ico" type="image/x-icon">

  <!-- CSS Path(s) -->
  <link rel="stylesheet" href="/node_modules/boxicons/css/boxicons.min.css" />
  <link rel="stylesheet" href="/node_modules/@fortawesome/fontawesome-free/css/all.min.css" />
  <link rel="stylesheet" href="/src/css/global.css" />
  <link rel="stylesheet" href="/src/css/index-lt.css" />
  <link rel="stylesheet" href="/src/css/index-dt.css" />

  <title>Flonskiy</title>

</head>

<body>
  <?php
  // Assigned Path(s) with error handling
  $MAIN_SITE = "src/html/index.html";

  // Check if the file exists and is readable
  if (is_readable($MAIN_SITE)) {
    include $MAIN_SITE;
  } else {
    // Error message displayed to the user
    echo "<p>Error: Unable to load the site content. Please try again later.</p>";
    error_log("Error: File $MAIN_SITE not found or not readable.", 0);
  }
  ?>

  <!-- JS Path(s) -->
  <script src="/src/js/scripts.js"></script>
  <script type="module" src="/src/js/alertBox.js"></script>
  <script type="module" src="/src/js/themeSwitch.js"></script>
</body>

</html>