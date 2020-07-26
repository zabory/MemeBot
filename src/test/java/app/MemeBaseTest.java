package app;

import org.junit.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class MemeBaseTest {
    static MemeBase memebase;

    @BeforeClass
    public static void construct(){
        // connect to the db
        String db = "C:\\sqlite\\";
        memebase = new MemeBase(db);
    }

    @Before
    public void before(){
        assertTrue(memebase.open());
    }

    @After
    public void after(){
        assertTrue(memebase.close());
        // cleanup the DB after a test
        try {
            Connection conn = DriverManager.getConnection("jdbc:sqlite:C:\\sqlite\\meme.db");
            conn.createStatement().execute("DELETE FROM " + memebase.memeTableName);
            conn.createStatement().execute("DELETE FROM " + memebase.tagLkpTableName);
            conn.createStatement().execute("DELETE FROM " + memebase.cacheTableName);
            conn.close();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

    }

    @Test
    public void adminSubmitTest() {
        Integer expecID = 1;
        String link = "https://cdn.discordapp.com/attachments/647667357879107584/735884634818215936/p1Uoukq.jpeg";
        assertEquals(expecID, memebase.store("Ziggy", link, Arrays.asList("meta", "books")));
        assertTrue(memebase.demote(expecID));
        assertEquals(link, memebase.reject(expecID));
    }

    @Test
    public void submitApproveTest() {
        Integer expecID = 1;
        String link = "https://cdn.discordapp.com/attachments/647667357879107584/735884634818215936/p1Uoukq.jpeg";
        assertEquals(expecID, memebase.cache("DANIEL THE FUGLY", link, Arrays.asList("daniel", "ugly", "yeet")));
        assertTrue(memebase.promote(expecID, "Ziggy"));
        assertTrue(memebase.demote(expecID));
        assertEquals(link, memebase.reject(expecID));
    }

    @Test
    public void simpleGetTest() {
        Integer expecID = 1;
        String link = "https://cdn.discordapp.com/attachments/647667357879107584/735884634818215936/p1Uoukq.jpeg";
        assertEquals(expecID, memebase.store("Ziggy", link, Arrays.asList("meta", "books")));
        assertEquals(link, memebase.get(null));
    }

    @Test
    public void noMemeTest() {
        Integer expecID = 1;
        String link = "https://cdn.discordapp.com/attachments/647667357879107584/735884634818215936/p1Uoukq.jpeg";
        assertEquals(expecID, memebase.store("Ziggy", link, Arrays.asList("meta", "books")));
        assertTrue(memebase.demote(expecID));
        assertEquals(link, memebase.reject(expecID));
        assertEquals(null, memebase.get(null));
    }

    @Test
    public void specMemeTest() {
        Integer ID1 = 1, ID2 = 2, ID3 = 3;
        String link1 = "https://cdn.discordapp.com/attachments/647667357879107584/735884634818215936/p1Uoukq.jpeg",
                link2 = "https://cdn.discordapp.com/attachments/647667357879107584/736409444577050764/MemeBot2000.jpg",
                link3 = "https://cdn.discordapp.com/attachments/647667357879107584/735864874932109322/xvOzIkw.jpeg";
        assertEquals(ID1, memebase.store("Ziggy", link1, Arrays.asList("meta", "books")));
        assertEquals(ID2, memebase.store("Ziggy", link2, Arrays.asList("server", "diagram")));
        assertEquals(ID3, memebase.store("Ziggy", link3, Arrays.asList("oracle", "sql", "dog", "animal", "test")));

        assertEquals(link1, memebase.get(Arrays.asList("books")));
        assertEquals(link2, memebase.get(Arrays.asList("diagram")));
        assertEquals(link3, memebase.get(Arrays.asList("animal", "oracle", "dog")));

        assertEquals(null, memebase.get(null));
    }

}
