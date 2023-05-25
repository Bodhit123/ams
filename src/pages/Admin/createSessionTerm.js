import React from "react";
import Sidebar from "../../component/sidebar";
import Topbar from "../../component/topbar";

const CreateSessionTerm = () => {
  return (
    <div id="page-top">
      <div id="wrapper">
        {/*  <!-- Sidebar --> */}
        <Sidebar/>
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            {/* <!-- TopBar -->*/}
            <Topbar/>
            {/* <!-- Container Fluid--> */}
            <div class="container-fluid" id="container-wrapper">
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Create Session and Term</h1>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="./">Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Create Session and Term
                  </li>
                </ol>
              </div>

              <div class="row">
                <div class="col-lg-12">
                  {/* <!-- Form Basic --> */}
                  <div class="card mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="m-0 font-weight-bold text-primary">
                        Create Session and Term
                      </h6>
                      {/* <?php echo $statusMsg; ?> */}
                    </div>
                    <div class="card-body">
                      <form method="post">
                        <div class="form-group row mb-3">
                          <div class="col-xl-6">
                            <label class="form-control-label">
                              Session Name
                              <span class="text-danger ml-2">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="sessionName"
                              value="<?php echo $row['sessionName'];?>"
                              id="exampleInputFirstName"
                              placeholder="Session"
                            />
                          </div>
                          <div class="col-xl-6">
                            <label class="form-control-label">
                              Term<span class="text-danger ml-2">*</span>
                            </label>
                            {/* <?php
                        $qry= "SELECT * FROM tblterm ORDER BY termName ASC";
                        $result = $conn->query($qry);
                        $num = $result->num_rows;		
                        if ($num > 0){
                          echo ' <select required name="termId" class="form-control mb-3">';
                          echo'<option value="">--Select Tern--</option>';
                          while ($rows = $result->fetch_assoc()){
                          echo'<option value="'.$rows['Id'].'" >'.$rows['termName'].'</option>';
                              }
                                  echo '</select>';
                              }
                            ?>   */}
                          </div>
                        </div>
                        {/* <?php
                    if (isset($Id))
                    {
                    ?> */}
                        <button
                          type="submit"
                          name="update"
                          class="btn btn-warning"
                        >
                          Update
                        </button>
                        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <?php
                    } else {           
                    ?> */}
                        <button
                          type="submit"
                          name="save"
                          class="btn btn-primary"
                        >
                          Save
                        </button>
                        {/* <?php
                    }         
                    ?> */}
                      </form>
                    </div>
                  </div>

                  {/* <!-- Input Group --> */}
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card mb-4">
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                          <h6 class="m-0 font-weight-bold text-primary">
                            All Session and Term
                          </h6>
                          <h6 class="m-0 font-weight-bold text-danger">
                            Note:{" "}
                            <i>
                              Click on the check symbol besides each to make
                              session and term active!
                            </i>
                          </h6>
                        </div>
                        <div class="table-responsive p-3">
                          <table
                            class="table align-items-center table-flush table-hover"
                            id="dataTableHover"
                          >
                            <thead class="thead-light">
                              <tr>
                                <th>#</th>
                                <th>Session</th>
                                <th>Term</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Activate</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              </tr>
                            </thead>

                            <tbody>
                              {/* <?php
                      $query = "SELECT tblsessionterm.Id,tblsessionterm.sessionName,tblsessionterm.isActive,tblsessionterm.dateCreated,
                      tblterm.termName
                      FROM tblsessionterm
                      INNER JOIN tblterm ON tblterm.Id = tblsessionterm.termId";
                      $rs = $conn->query($query);
                      $num = $rs->num_rows;
                      $sn=0;
                      if($num > 0)
                      { 
                        while ($rows = $rs->fetch_assoc())
                          {
                            if($rows['isActive'] == '1'){$status = "Active";}else{$status = "InActive";}
                             $sn = $sn + 1;
                            echo" */}
                              <tr>
                                <td>".$sn."</td>
                                <td>".$rows['sessionName']."</td>
                                <td>".$rows['termName']."</td>
                                <td>".$status."</td>
                                <td>".$rows['dateCreated']."</td>
                                <td>
                                  <a href="#">
                                    <i class="fas fa-fw fa-check"></i>
                                  </a>
                                </td>
                                <td>
                                  <a href="">
                                    <i class="fas fa-fw fa-edit"></i>
                                  </a>
                                </td>
                                <td>
                                  <a href="">
                                    <i class="fas fa-fw fa-trash"></i>
                                  </a>
                                </td>
                              </tr>
                              {/* }
                      }
                      else
                      {
                           echo    */}
                              "
                              <div class="alert alert-danger" role="alert">
                                No Record Found!
                              </div>
                              ";
                              {/* }
                      
                      ?> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--Row-->

          <!-- Documentation Link -->
          <!-- <div class="row">
            <div class="col-lg-12 text-center">
              <p>For more documentations you can visit<a href="https://getbootstrap.com/docs/4.3/components/forms/"
                  target="_blank">
                  bootstrap forms documentations.</a> and <a
                  href="https://getbootstrap.com/docs/4.3/components/input-group/" target="_blank">bootstrap input
                  groups documentations</a></p>
            </div>
          </div> --> */}
              </div>
              {/* <!---Container Fluid--> */}
            </div>
            {/* <!-- Footer -->
       <?php include "Includes/footer.php";?>
      <!-- Footer --> */}
          </div>
        </div>

        {/* <!-- Scroll to top --> */}
        <a class="scroll-to-top rounded" href="#page-top">
          <i class="fas fa-angle-up"></i>
        </a>

        {/* <script src="../vendor/jquery/jquery.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="../vendor/jquery-easing/jquery.easing.min.js"></script>
  <script src="js/ruang-admin.min.js"></script>
   <!-- Page level plugins -->
  <script src="../vendor/datatables/jquery.dataTables.min.js"></script>
  <script src="../vendor/datatables/dataTables.bootstrap4.min.js"></script>

  <!-- Page level custom scripts -->
  <script>
    $(document).ready(function () {
      $('#dataTable').DataTable(); // ID From dataTable 
      $('#dataTableHover').DataTable(); // ID From dataTable with Hover
    });
  </script> */}
      </div>
    </div>
  );
};

export default CreateSessionTerm;
