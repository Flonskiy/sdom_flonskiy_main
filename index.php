<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/path/to/favicon.ico" type="image/x-icon">

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
</body>

</html>