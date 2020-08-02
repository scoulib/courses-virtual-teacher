/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package universite.angers.master.info.courses.virtual.teacher.desktop.app;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.control.Toggle;
import javafx.scene.control.ToggleGroup;

/**
 *
 * @author etudiant
 */
public class FXMLLoginController implements Initializable {
    
//    @FXML
//    private Button validateButton;
    
    @FXML
    private TextField idField;
    
    @FXML 
    private PasswordField passwordField;
    
    @FXML
    private ToggleGroup userTypeToggleGroup;
    
    @FXML 
    private Toggle studentToggle;
    
    @FXML 
    private Toggle adminToggle;
    
    @FXML 
    private Toggle teacherToggle;
    
    @FXML
    private void validateLogin(ActionEvent event) {
        String password = passwordField.getText();
        String id = idField.getText();
        //
        System.out.println(id + " " + password);
        Toggle selectedToggle = userTypeToggleGroup.getSelectedToggle();
        if(selectedToggle == studentToggle){
            System.out.println("STUDENT");
        } else if(selectedToggle == teacherToggle){
            System.out.println("TEACHER");
        } else {
            System.out.println("ADMIN");
        }
    }
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
    }    
    
}
