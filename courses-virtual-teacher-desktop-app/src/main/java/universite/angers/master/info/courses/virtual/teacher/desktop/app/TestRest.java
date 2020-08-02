/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package universite.angers.master.info.courses.virtual.teacher.desktop.app;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;

/**
 *
 * @author etudiant
 */
public class TestRest {

    public static void main(String[] args) {

        String ex = "{ \"name\":\"architecture des ordinateurs\",\n"
                + "    \"description\":\"Ce cours est déstiné à la L3 informatique \",\n"
                + "    \"elementCourses\":\n"
                + "    [\n"
                + "            {\"title\":\"notion fondamentals\", \"subElements\":\n"
                + "                  [\n"
                + "                    {\n"
                + "                      \"title\":\"chapitre 3\", \"subElements\":\n"
                + "                      [\n"
                + "                        {\"title\":\"3.1 introduction\", \"content\":\"Pour comprendre comment fonctionne un ordinateur, il faut avant tout comprendre son mode de fonctionnement interne.Les circuits électroniques sont capables de réaliser des calculs complexesen utilisant une représentation de l'information binaire.\", \"subElements\":\n"
                + "                          [\n"
                + "                              {\"title\":\"3.1.1 L'invention du transistor\", \"content\": \"L'invention du transistor date du 23 Décembre  1947, lorsqueWilliamShockley,   Walter   Brattain   et   John   Bardeenmirent   au   point   letransistor   avec   point   de   contact   (point-contact   transistor)   aux   BellLaboratories\", \"subElements\":[]},\n"
                + "                              {\"title\":\"3.1.2 Fonctionnement du transistor\", \"subElements\":\n"
                + "                                  [\n"
                + "                                      {\"title\":\"Le Transistor MOSFET\", \"content\": \"De nos jours la grande majorité des transistors des circuits intégrés sont detype MOSFET. LeMetal Oxide Semiconductor Field Effect Transistor- MOSFET)est   dérivé   du   transistor   à   effet   de   champs   (Field EffectTransistor - FET)\" , \"subElements\":[]}\n"
                + "                                  ]\n"
                + "                              }\n"
                + "                          ]\n"
                + "                        }\n"
                + "                     ]\n"
                + "                    }\n"
                + "                  ]\n"
                + "            },\n"
                + "            {\"title\":\"travaux partique\", \"subElements\":\n"
                + "                [\n"
                + "                    {\"title\":\"TP1 1\", \"subElements\":[]}\n"
                + "                ]\n"
                + "            }\n"
                + "    ]}";
        getCours(ex);
    }

    protected static String getCours(String retrievedText) {
        String output = null;
        String output2 = null;
        try {
            final String path = "http://localhost:9220/";
            String value = retrievedText;
            Client client = Client.create();
            client.addFilter(new HTTPBasicAuthFilter("tteacher", "test"));
            WebResource webResource = client.resource(path).path("courses");
            ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);
            System.out.println("Status retour : "+ response.getStatus());
            if (response.getStatus() != 200) {
                throw new RuntimeException("Failed : HTTP error code : " + response.getStatus());
            }
            output = response.getEntity(String.class);
            
            //TODO Deserialiser output to ElementCours et puis boucler sur element cours pour afficher les attributs 
            //ElementCours
            
            //output2 = output.replace("@Produces(\"text/html\") Output: ", "");
            System.out.println(output);
            System.out.println("\n\n");

        } catch (Exception e) {
            System.out.println("Server: Click Again and enter a number");
        }
        return output2;
    }

}
