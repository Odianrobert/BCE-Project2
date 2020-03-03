DROP DATABASE IF EXISTS fun_game;
CREATE DATABASE fun_game;
USE fun_game;

CREATE TABLE sentences (
    id INT AUTO_INCREMENT, 
    sentence VARCHAR(100),
    requires_noun INT,
    requires_object INT,
    PRIMARY KEY(id)
);

CREATE TABLE objects (
    id INT AUTO_INCREMENT, 
    sentence_object VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE nouns (
    id INT AUTO_INCREMENT, 
    sentence_noun VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE scavenger (
    id INT AUTO_INCREMENT, 
    scavenger_sentence VARCHAR(100),
    PRIMARY KEY(id)
);

INSERT INTO sentences(sentence, requires_noun, requires_object)
VALUES ("Compliment $n on their $o", 1, 1), ("Try and sell your $o to $n", 1, 1),
        ("Ask $n about your $o", 1, 1), ("Offer your $o to $n", 1, 1),
        ("Get $n to sign your $o", 1, 1), ("Ask $n for a(n) $o", 1,1),
        ("Borrow a(n) $o from  $n", 1,1),
        ("Propose to trade for a(n) $o from  $n", 1,1),
        ("Ask to buy a(n) $o from $n", 1,1),
        ("Yell I need a(n) $o at  $n", 1,1),
        ("Whisper check out my $o in the ear of $n", 1,1);

INSERT INTO objects(sentence_object)
VALUES ("eyebrows"), ("mixtape"), ("shoes"), ("thumbs"), ("baby oil"),
        ("bag of money"), ("bar stool"),("bath bomb"),("bed"),("beer"),
        ("belt buckle"),("bologna sandwich"),("bonesaw"),("boombox"),
        ("brocolli"),("chapstick"),("cheap perfume"),("checkbook"),
        ("cheese wheel"),("cinder block"),("couch"),("cowboy hat"),
        ("crowbar"),("deodorant"),("dictionary"),("duct tape"),("dump truck"),
        ("egg whites"),("eggplant"),("entrails"),("fish hook"),("floss"),
        ("fork"),("frying pan"),("gameboy"),("giraffe"),("glitter"),
        ("glow stick"),("graphing calculator"),("hair brush"),
        ("handcuffs"),("incense"),("ipod"),("jar of pickles"),
        ("ketchup bottle"),("knee pads"),("largemouth bass"),
        ("leg warmers"),("legal pad"),("lighter"),("magic eraser"),
        ("magnet "),("mandle"),("marbles"),("mixtape"),("mop"),
        ("mustard bottle"),("nail file"),("ornament"),("packing peanuts"),
        ("pair of dice"),("panda"),("paper clip"),("piece of gum"),
        ("popcorn"),("power ranger"),("purse"),("robot"),("rock"),
        ("rotary phone"),("rubber duck"),("rug"),("rusty nail"),
        ("scotch tape"),("sears catalog"),("shoes"),("shot"),
        ("ski mask"),("snapping turtle"),("snow globe"),
        ("socks"),("soy sauce packet"),("squat rack"),
        ("squirt gun"),("squirtle"),("stop sign"),("summer sausage"),
        ("sun tan lotion"),("sunglasses"),("sword"),("thumbs"),
        ("toe ring"),("toilet paper tube"),("toilet paper"),("towel "),
        ("unicorn"),("universal remote"),("used tissue"),("vape"),
        ("walkman"),("washing machine"),("whipped cream"),("zipper");

INSERT INTO nouns(sentence_noun)
VALUES ("an angry man"), ("a pretty woman"), ("the bartender"), ("a sloppy drunk"), ("a meathead"), ("abnormally tan girl"), 
        ("a silver fox"), ("a cougar"), ("an elderly person"), ("a guy with a huge beard"), 
        ("a girl with bright red lipstick"), ("a girl with unique haircolor"), 
        ("a man with a ponytail"), ("a guy in a beanie"), ("a person wearing sunglasses"), 
        ("a person in hoodie"), ("a girl in high heels"), ("a person texting"), 
        ("a person that is staring into space"), ("an underdressed person"), 
        ("an overdressed person"), ("a man with a mustache"), ("a couple on a date"), 
        ("a person in a jean jacket"), ("a person wearing a baseball hat"), 
        ("a person with a sports team on their shirt"), ("a man with exposed chest hair"), 
        ("a girl with braids"), ("a person in mid-bite of food");

INSERT INTO scavenger(scavenger_sentence)
VALUES ("Someone on a date, but they're texting"), ("Someone whos very confused"), ("Someone spilled a drink"), ("A man hitting on an un-interested woman"), 
        ("Someone vaping inside"), ("Someone doing something thats illegal"), ("Something upside-down");


