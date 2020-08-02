/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package universite.angers.master.info.courses.virtual.teacher.desktop.app;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.BorderPane;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;

import javax.lang.model.element.Element;

/**
 * FXML Controller class
 *
 * @author etudiant
 */
public class FXMLMenuCoursController implements Initializable {

    @FXML
    private BorderPane bp;
    @FXML
    private Button _btnHome;
    @FXML
    private Button _btnDashbord;
    @FXML
    private Button _btnCompte;
    @FXML
    private Button _btnCours;
    @FXML
    private Button _btnStructures;
    @FXML
    private Button _btnTaches;
    @FXML
    private Button _btnMails;
    @FXML
    private Button _btnDeconnecter;
    @FXML
    private TableView<Course> myTable;

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
        TableColumn id = new TableColumn("Id                                              ");
        TableColumn titre = new TableColumn("TITRE                                              ");
        TableColumn description = new TableColumn("DESCRIPTION                                  ");
        myTable.getColumns().addAll(titre, titre, description);

        //Step : 2# Define data in an Observable list and add data as you want to show inside table    
        final ObservableList<Course> data = FXCollections.observableArrayList();

        //Associate date with columns
        id.setCellValueFactory(new PropertyValueFactory<Element, String>("id"));
        titre.setCellValueFactory(new PropertyValueFactory<Element, String>("titre"));
        description.setCellValueFactory(new PropertyValueFactory<Element, String>("description"));

    }

    

}
