$(function() {

    describe("RSS Feeds", function() {
    // tests that at least one feed has loaded and is not undefined.
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
    // tests that each feed's URL is defined and is not an empty string.
        it("are links", function() {
            allFeeds.forEach(function(feed) { 
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            });
        });

    // tests that each feed's name is defined and is not an empty string. 
         it("have names", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            });
        });
    });

    describe("The Menu", function() {
        var body = document.querySelector("body");

    // tests that the menu is hidden on page load.
        it("is hidden by default", function() {
            expect(body.classList).toContain("menu-hidden");
        });
        
    // tests that menu is visible after click event, and is hidden after a second click event.
        it("is toggleable", function() {
            document.querySelector(".menu-icon-link").click();
            expect(body.classList).not.toContain("menu-hidden");

            document.querySelector(".menu-icon-link").click();
            expect(body.classList).toContain("menu-hidden");
        });
    });

    describe("Initial Entries", function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
    // checks that entry links have loaded.
        it("are not empty", function(done) {
            var entriesList = (document.querySelector(".feed").getElementsByClassName("entry"));

            expect(entriesList.length).toBeGreaterThan(0);
            done();
        });
    });
 
    describe("New Feed Selection", function() {
       var feed1;
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed1 = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });
    // tests that feed is loading as expected.
       it("content changes when feed loads", function(done) {
            var feed2 = document.querySelector(".feed").innerHTML;
            expect(feed1).not.toBe(feed2);
            done();
        });
    });
}());
