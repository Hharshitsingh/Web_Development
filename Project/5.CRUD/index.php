<?PHP
// INSERT INTO `note` (`srno`, `title`, `description`, `timestamp`) VALUES (NULL, 'hello', 'byy byy', '2021-06-02 14:36:22.000000');
$insert = false;
$update = false;
$delete = false;

// connect to database
$servername = "localhost";
$username = "root";
$password = "";
$database = "notesapp";

// I am Creating a connection here with MySQL.
$conn = mysqli_connect($servername, $username, $password, $database);

// I am Checking connection here. 
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// echo "Connected successfully";

if (isset($_GET['delete'])) {
  $sno = $_GET['delete'];
  // echo "$sno";
  $delete = true;
  $sql = "DELETE FROM `note` WHERE `note`.`srno` = '$sno'";
  $result = mysqli_query($conn, $sql);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_POST['snoEdit'])) {
    // echo "yes";
    // update the record
    $sno = $_POST['snoEdit'];
    $title = $_POST["titleEdit"];
    $description = $_POST["descriptionEdit"];
    $sql = "UPDATE `note` SET `title` = '$title', `description` = '$description' WHERE `note`.`srno` = '$sno'";
    $result = mysqli_query($conn, $sql);
    if ($result) {
      $update = true;
    } else {
      echo "We could not update the record successfully";
    }
  } else {
    $title = $_POST["title"];
    $description = $_POST["description"];
    $sql = "INSERT INTO `note` (`title`, `description`,`timestamp`) VALUES ('$title', '$description',current_timestamp())";
    $result = mysqli_query($conn, $sql);

    if ($result) {
      // echo "The record has been inserted successfully";
      $insert = true;
    } else {
      echo "The record has not been inserted successfully due to an error " . mysqli_error($conn);
    }
  }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous" />

  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
  <title>CRUD</title>
</head>

<body>
  <!-- Edit modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editmodal">
  Edit Modal
</button> -->

  <!-- Modal -->
  <div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="editmodalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editmodalLabel">Edit Notes</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="index.php" , method="post">
            <input type="hidden" name="snoEdit" , id="snoEdit">
            <div class="mb-3">
              <label for="title" class="form-label">Note Tittle</label>
              <input type="text" class="form-control" id="titleEdit" name="titleEdit" placeholder="Add a note title here" />
            </div>
            <div class="form-label">
              <label for="desc">Note Description</label>
              <textarea class="form-control" placeholder="Add a description here" id="descriptionEdit" name="descriptionEdit"></textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Update Note</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">PHP CRUD</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Contact us</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  </nav>
  <?php
  if ($insert) {
    echo "<div class='alert alert-success d-flex align-items-center' role='alert'>
  <svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>
  <div>
  Your record has been inserted successfully
  </div>
</div>";
  }

  if ($update) {
    echo "<div class='alert alert-success d-flex align-items-center' role='alert'>
  <svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>
  <div>
  Your record has been Updated successfully
  </div>
</div>";
  }

  if ($delete) {
    echo "<div class='alert alert-success d-flex align-items-center' role='alert'>
  <svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Success:'><use xlink:href='#check-circle-fill'/></svg>
  <div>
  Your record has been delete successfully
  </div>
</div>";
  }

  ?>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </symbol>
    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </symbol>
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </symbol>
  </svg>

  <div class="container my-5">
    <h2>Add a Note</h2>
    <form action="index.php" , method="post">
      <div class="mb-3">
        <label for="title" class="form-label">Note Tittle</label>
        <input type="text" class="form-control" id="title" name="title" placeholder="Add a note title here" />
      </div>
      <div class="form-label">
        <label for="desc">Note Description</label>
        <textarea class="form-control" placeholder="Add a description here" id="description" name="description"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add Note</button>
    </form>
  </div>

  <div class="container my-5">
    <table class="table" , id="example">
      <thead>
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Date/Time</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>

        <?php

        $sql = "SELECT * FROM `note`";
        $result = mysqli_query($conn, $sql);
        $sno = 0;
        while ($row = mysqli_fetch_array($result)) {
          $sno++;
          echo " <tr>
        <th scope='row'>" . $sno . "</th>
        <td>" . $row['title'] . "</td>
        <td>" . $row['description'] . "</td>
        <td>" . $row['timestamp'] . "</td>
        <td><button type='button' class='btn btn-warning edit' id = " . $row['srno'] . ">Edit</button> <button type='button' class='btn btn-danger delete' id = d" . $row['srno'] . " >Delete</button></td>
      </tr>";
        }

        ?>
      </tbody>
    </table>

  </div>

  <!-- Optional JavaScript; choose one of the two! -->

  <!-- Option 1: Bootstrap Bundle with Popper -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>


  <!-- Option 2: Separate Popper and Bootstrap JS -->
  <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
    -->

  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->

  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
  <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>

  <script>
    $(document).ready(function() {
      $('#example').DataTable();
    });
  </script>

  <script>
    edits = document.getElementsByClassName('edit');
    Array.from(edits).forEach((element) => {
      element.addEventListener('click', (e) => {
        console.log('edit', );
        tr = e.target.parentNode.parentNode;
        title = tr.getElementsByTagName('td')[0].innerText;
        description = tr.getElementsByTagName('td')[1].innerText;
        snoEdit.value = e.target.id
        titleEdit.value = title;
        descriptionEdit.value = description;
        console.log(snoEdit.value, title, description)
        $('#editmodal').modal('toggle');
      })
    })

    deletes = document.getElementsByClassName('delete');
    Array.from(deletes).forEach((element) => {
      element.addEventListener('click', (e) => {
        console.log('edit', );
        sno = e.target.id.substr(1);

        if (confirm('Are you sure you want to delete!')) {
          console.log('Yes')
          console.log(sno);
          window.location = `index.php?delete=${sno}`;
        } else {
          console.log('No')
        }
      })
    })
  </script>
</body>
</html>