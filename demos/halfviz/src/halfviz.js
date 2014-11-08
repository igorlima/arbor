//
// halfviz.js
//
// instantiates all the helper classes, sets up the particle system + renderer
// and maintains the canvas/editor splitview
//
(function(){
  
  trace = arbor.etc.trace
  objmerge = arbor.etc.objmerge
  objcopy = arbor.etc.objcopy
  var parse = Parseur().parse

  var DOCS = {
    'a-new-hope': {"_id":"a-new-hope","_rev":"1-6d9c51704ad48070adf35333f743d14a","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOSWA 1 (1998)\n; A New Hope\n; by Christopher Golden\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n1 -> 14\n1 -> 69\n5 -> 2\n5 -> 97\n7 -> 52\n7 -> 95\n16 -> 5\n16 -> 33\n19 -> 67\n19 -> 20\n20 -> 103\n20 -> 16\n26 -> 85\n26 -> 7\n33 -> 37\n33 -> 116\n69 -> 6\n69 -> 26\n72 -> 84\n72 -> 23\n72 -> 93\n85 -> 59\n85 -> 19\n93 -> 87\n93 -> 94\n95 -> 10\n95 -> 117\n117 -> 109\n117 -> 72\n\n; endings\n1 {color:#444, shape:dot, label:\u00b7}\n2 {color:#95cde5}\n6 {color:#db8e3c}\n10 {color:#c6531e}\n14 {color:#c6531e}\n23 {color:#ffe35f}\n37 {color:#95cde5}\n52 {color:#db8e3c}\n59 {color:#db8e3c}\n67 {color:#95cde5}\n84 {color:#c6531e}\n87 {color:#db8e3c}\n94 {color:#c6531e}\n97 {color:#b01700}\n103 {color:#b01700}\n109 {color:#95cde5}\n116 {color:#95cde5}","example":"cyoa","title":"A New Hope"},
    'case-of-the-silk-king': {"_id":"case-of-the-silk-king","_rev":"1-e8ceaebda42a2c5a76d6684ff9d867da","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 53 (1986)\n; Case Of The Silk King\n; by Shannon Gilligan\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n1 -> 4\n1 -> 12\n4 -> 21\n4 -> 23\n7 -> 34\n7 -> 13\n7 -> 44\n12 -> 25\n12 -> 24\n23 -> 50\n23 -> 53\n24 -> 6\n24 -> 42\n25 -> 94\n25 -> 66\n32 -> 47\n32 -> 84\n42 -> 32\n42 -> 7\n50 -> 72\n50 -> 65\n53 -> 67\n53 -> 68\n66 -> 79\n66 -> 80\n67 -> 88\n67 -> 83\n68 -> 77\n68 -> 91\n80 -> 99\n80 -> 97\n88 -> 110\n88 -> 104\n91 -> 106\n91 -> 100\n\n; endings\n1 {color:#444, shape:dot, label:\u00b7}\n6 {color:#c6531e}\n13 {color:#c6531e}\n21 {color:#c6531e}\n34 {color:#db8e3c}\n44 {color:#b01700}\n47 {color:#ffe35f}\n65 {color:#c6531e}\n72 {color:#b01700}\n77 {color:#b01700}\n79 {color:#b01700}\n83 {color:#b01700}\n84 {color:#b01700}\n94 {color:#b01700}\n97 {color:#db8e3c}\n99 {color:#95cde5}\n100 {color:#ffe35f}\n104 {color:#c6531e}\n106 {color:#ffe35f}\n110 {color:#b01700}","example":"cyoa","title":"Case Of The Silk King"},
    'cube': {"_id":"cube","_rev":"1-9405f221c6d6391d7950c28b268f767d","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":false},"src":"{color:none, label:\u00b7}\n-> {color:#aa9}\n\n1 -- 2\n3 -- 4\n2 -- 3\n4 -- 1\n2 -- 5\n5 -- 6\n6 -- 1\n5 -- 7\n7 -- 3\n7 -- 8\n8 -- 4\n8 -- 6\n\n","example":"doodle","title":"Cube"},
    'date-with-destiny': {"_id":"date-with-destiny","_rev":"1-581cff1c6caa9c74d9e81b483a300ac2","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; DWD 1 (2003)\n; Date with Destiny\n; by Miranda Clarke\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n1 -> 3\n1 -> 10\n2 -> 131\n2 -> 35\n3 -> 9\n3 -> 21\n3 -> 58\n4 -> 120\n4 -> 124\n5 -> 57\n5 -> 91\n6 -> 5\n6 -> 50\n8 -> 81\n8 -> 59\n10 -> 87\n10 -> 6\n11 -> 87\n13 -> 23\n13 -> 72\n18 -> 44\n18 -> 31\n23 -> 112\n24 -> 10\n25 -> 118\n25 -> 4\n26 -> 114\n31 -> 92\n31 -> 77\n36 -> 130\n36 -> 7\n44 -> 77\n50 -> 54\n50 -> 82\n50 -> 8\n54 -> 91\n59 -> 30\n59 -> 25\n62 -> 55\n62 -> 74\n64 -> 123\n64 -> 116\n66 -> 129\n66 -> 36\n72 -> 106\n72 -> 18\n74 -> 93\n74 -> 26\n77 -> 90\n77 -> 24\n79 -> 11\n79 -> 13\n82 -> 54\n82 -> 8\n84 -> 64\n84 -> 66\n87 -> 22\n87 -> 121\n91 -> 81\n91 -> 79\n91 -> 105\n93 -> 133\n93 -> 114\n105 -> 97\n105 -> 122\n106 -> 112\n106 -> 18\n112 -> 19\n112 -> 83\n113 -> 103\n113 -> 84\n114 -> 88\n114 -> 39\n114 -> 67\n116 -> 36\n121 -> 2\n121 -> 35\n121 -> 131\n124 -> 40\n124 -> 113\n131 -> 65\n131 -> 62\n\n; endings\n1 {color:#444, shape:dot, label:\u00b7}\n7 {color:#c6531e}\n9 {color:#c6531e}\n19 {color:#c6531e}\n21 {color:#c6531e}\n22 {color:#c6531e}\n30 {color:#db8e3c}\n35 {color:#c6531e}\n35 {color:#c6531e}\n39 {color:#ffe35f}\n40 {color:#c6531e}\n55 {color:#c6531e}\n57 {color:#c6531e}\n58 {color:#c6531e}\n65 {color:#95cde5}\n67 {color:#95cde5}\n81 {color:#c6531e}\n81 {color:#c6531e}\n83 {color:#db8e3c}\n88 {color:#ffe35f}\n90 {color:#95cde5}\n92 {color:#95cde5}\n97 {color:#ffe35f}\n103 {color:#c6531e}\n118 {color:#c6531e}\n120 {color:#c6531e}\n122 {color:#ffe35f}\n123 {color:#b01700}\n129 {color:#b01700}\n130 {color:#95cde5}\n133 {color:#c6531e}","example":"cyoa","title":"Date with Destiny "},
    'house-of-danger': {"_id":"house-of-danger","_rev":"1-71d4350a87e57e5f8df3d2e9828f6e0c","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 15 (1982)\n; House of Danger\n; by R.A. Montgomery\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n1 -> 2\n2 -> 6\n3 -> 10\n4 -> 9\n6 -> 7\n7 -> 4\n7 -> 13\n9 -> 29\n9 -> 3\n10 -> 63\n10 -> 14\n11 -> 16\n12 -> 24\n13 -> 26\n14 -> 12\n15 -> 19\n18 -> 32\n18 -> 34\n19 -> 28\n21 -> 22\n22 -> 23\n24 -> 11\n26 -> 27\n27 -> 15\n27 -> 87\n28 -> 21\n28 -> 41\n29 -> 18\n31 -> 40\n32 -> 59\n34 -> 36\n36 -> 70\n37 -> 31\n37 -> 50\n38 -> 39\n40 -> 38\n41 -> 46\n44 -> 45\n46 -> 52\n47 -> 49\n50 -> 51\n51 -> 54\n52 -> 53\n53 -> 47\n53 -> 44\n54 -> 60\n54 -> 69\n55 -> 57\n55 -> 62\n58 -> 37\n58 -> 43\n60 -> 55\n63 -> 64\n63 -> 77\n64 -> 65\n64 -> 79\n65 -> 67\n67 -> 68\n68 -> 72\n68 -> 97\n70 -> 58\n72 -> 75\n72 -> 73\n73 -> 74\n75 -> 81\n77 -> 78\n78 -> 80\n79 -> 84\n80 -> 82\n82 -> 83\n84 -> 85\n85 -> 86\n85 -> 88\n86 -> 94\n87 -> 90\n90 -> 91\n91 -> 92\n92 -> 93\n92 -> 99\n93 -> 102\n96 -> 101\n97 -> 33\n99 -> 100\n100 -> 104\n100 -> 105\n102 -> 103\n103 -> 106\n104 -> 96\n104 -> 108\n\n; endings\n1 {color:#444, shape:dot, label:\u00b7}\n16 {color:#b01700}\n23 {color:#b01700}\n33 {color:#b01700}\n39 {color:#ffe35f}\n43 {color:#b01700}\n45 {color:#ffe35f}\n49 {color:#db8e3c}\n57 {color:#95cde5}\n59 {color:#c6531e}\n62 {color:#95cde5}\n69 {color:#b01700}\n74 {color:#ffe35f}\n81 {color:#db8e3c}\n83 {color:#db8e3c}\n88 {color:#b01700}\n94 {color:#db8e3c}\n101 {color:#c6531e}\n105 {color:#b01700}\n106 {color:#95cde5}\n108 {color:#c6531e}","example":"cyoa","title":"House of Danger"},
    'inside-ufo-54-40': {"_id":"inside-ufo-54-40","_rev":"1-82f863ede01b5f015bbabecfec13cbf5","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 12 (1982)\n; Inside UFO 54-40\n; by Edward Packard\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n1 -> 6\n3 -> 5\n3 -> 16\n3 -> 8\n4 -> 22\n4 -> 25\n5 -> 11\n5 -> 14\n6 -> 3\n6 -> 4\n8 -> 10\n10 -> 15\n10 -> 18\n11 -> 111\n15 -> 54\n16 -> 30\n16 -> 32\n18 -> 34\n18 -> 36\n20 -> 57\n20 -> 58\n22 -> 37\n22 -> 117\n25 -> 114\n28 -> 112\n30 -> 48\n30 -> 49\n32 -> 117\n34 -> 40\n34 -> 51\n36 -> 52\n36 -> 65\n37 -> 61\n37 -> 64\n38 -> 75\n38 -> 76\n38 -> 79\n42 -> 27\n42 -> 99\n43 -> 44\n43 -> 46\n44 -> 71\n48 -> 113\n52 -> 82\n54 -> 56\n56 -> 27\n56 -> 28\n57 -> 91\n64 -> 63\n64 -> 107\n65 -> 93\n65 -> 118\n69 -> 88\n69 -> 100\n76 -> 80\n76 -> 83\n80 -> 98\n80 -> 90\n82 -> 87\n82 -> 85\n83 -> 94\n85 -> 86\n86 -> 73\n91 -> 92\n94 -> 96\n96 -> 116\n101 -> 104\n105 -> 106\n107 -> 108\n108 -> 105\n108 -> 97\n111 -> 20\n111 -> 21\n112 -> 42\n112 -> 43\n113 -> 69\n113 -> 67\n114 -> 41\n114 -> 50\n117 -> 38\n117 -> 8\n\n; endings\n1 {color:#444, shape:dot, label:\u00b7}\n14 {color:#c6531e}\n21 {color:#db8e3c}\n27 {color:#db8e3c}\n40 {color:#b01700}\n41 {color:#db8e3c}\n46 {color:#b01700}\n49 {color:#c6531e}\n50 {color:#db8e3c}\n51 {color:#c6531e}\n58 {color:#95cde5}\n61 {color:#b01700}\n63 {color:#c6531e}\n67 {color:#ffe35f}\n71 {color:#ffe35f}\n73 {color:#db8e3c}\n75 {color:#c6531e}\n79 {color:#b01700}\n87 {color:#b01700}\n88 {color:#c6531e}\n90 {color:#b01700}\n92 {color:#db8e3c}\n93 {color:#b01700}\n97 {color:#b01700}\n98 {color:#95cde5}\n99 {color:#b01700}\n100 {color:#ffe35f}\n104 {color:#95cde5}\n106 {color:#95cde5}\n116 {color:#95cde5}\n118 {color:#95cde5}","example":"cyoa","title":"Inside UFO 54-40"},
    'journey-under-the-sea': {"_id":"journey-under-the-sea","_rev":"1-2f2f958b6519c47b5d05534ceb78ad17","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 2 (1979)\n; Journey Under the Sea\n; by R.A. Montgomery\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n2 -> 6\n2 -> 4\n3 -> 9\n3 -> 14\n4 -> 3\n4 -> 8\n6 -> 7\n7 -> 10\n7 -> 12\n8 -> 18\n8 -> 13\n9 -> 25\n9 -> 21\n10 -> 17\n10 -> 19\n12 -> 20\n12 -> 22\n13 -> 24\n13 -> 27\n14 -> 23\n14 -> 26\n17 -> 31\n17 -> 32\n18 -> 28\n18 -> 30\n19 -> 34\n19 -> 36\n21 -> 38\n21 -> 33\n25 -> 6\n26 -> 40\n26 -> 39\n27 -> 42\n27 -> 43\n28 -> 29\n29 -> 44\n29 -> 45\n32 -> 47\n32 -> 48\n33 -> 51\n33 -> 53\n34 -> 50\n34 -> 49\n38 -> 54\n38 -> 52\n40 -> 55\n40 -> 56\n42 -> 57\n42 -> 58\n43 -> 6\n44 -> 59\n44 -> 60\n45 -> 64\n45 -> 62\n47 -> 63\n47 -> 66\n48 -> 50\n50 -> 8\n51 -> 67\n51 -> 68\n52 -> 74\n52 -> 75\n53 -> 69\n53 -> 70\n54 -> 71\n54 -> 72\n55 -> 76\n55 -> 77\n56 -> 78\n56 -> 79\n59 -> 80\n59 -> 82\n60 -> 81\n60 -> 84\n63 -> 87\n63 -> 88\n64 -> 62\n64 -> 83\n64 -> 86\n66 -> 31\n67 -> 6\n69 -> 96\n69 -> 97\n70 -> 98\n70 -> 99\n71 -> 90\n71 -> 89\n74 -> 92\n74 -> 93\n75 -> 106\n79 -> 51\n81 -> 116\n81 -> 117\n82 -> 112\n82 -> 114\n87 -> 94\n87 -> 95\n89 -> 101\n89 -> 103\n90 -> 100\n90 -> 102\n93 -> 104\n93 -> 105\n95 -> 111\n95 -> 110\n99 -> 54\n\n; endings\n2 {color:#444, shape:dot, label:\u00b7}\n20 {color:#c6531e}\n22 {color:#b01700}\n23 {color:#b01700}\n24 {color:#b01700}\n30 {color:#db8e3c}\n31 {color:#c6531e}\n36 {color:#b01700}\n39 {color:#db8e3c}\n49 {color:#db8e3c}\n57 {color:#ffe35f}\n58 {color:#db8e3c}\n62 {color:#b01700}\n68 {color:#c6531e}\n72 {color:#c6531e}\n76 {color:#ffe35f}\n77 {color:#c6531e}\n78 {color:#ffe35f}\n80 {color:#95cde5}\n83 {color:#ffe35f}\n84 {color:#95cde5}\n86 {color:#db8e3c}\n88 {color:#c6531e}\n92 {color:#b01700}\n94 {color:#b01700}\n96 {color:#ffe35f}\n97 {color:#b01700}\n98 {color:#ffe35f}\n100 {color:#db8e3c}\n101 {color:#db8e3c}\n102 {color:#95cde5}\n103 {color:#95cde5}\n104 {color:#ffe35f}\n105 {color:#b01700}\n106 {color:#ffe35f}\n110 {color:#ffe35f}\n111 {color:#ffe35f}\n112 {color:#95cde5}\n114 {color:#ffe35f}\n116 {color:#b01700}\n117 {color:#95cde5}","example":"cyoa","title":"Journey Under the Sea"},
    'mystery-of-the-secret-room': {"_id":"mystery-of-the-secret-room","_rev":"1-058a97024fc92a7254f3d02a4fbfe7c9","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 63 (1986)\n; Mystery of the Secret Room\n; by Ellen Kushner\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n1 -> 91\n1 -> 31\n3 -> 56\n3 -> 16\n7 -> 109\n7 -> 94\n11 -> 33\n11 -> 51\n13 -> 36\n13 -> 65\n16 -> 91\n16 -> 60\n23 -> 86\n23 -> 117\n24 -> 40\n24 -> 11\n24 -> 11\n29 -> 88\n31 -> 13\n31 -> 100\n33 -> 107\n33 -> 62\n36 -> 8\n36 -> 104\n37 -> 14\n37 -> 29\n40 -> 85\n40 -> 70\n60 -> 67\n60 -> 96\n66 -> 103\n66 -> 39\n70 -> 76\n74 -> 93\n74 -> 4\n74 -> 108\n76 -> 52\n76 -> 66\n88 -> 24\n88 -> 76\n91 -> 88\n91 -> 37\n93 -> 41\n93 -> 114\n94 -> 43\n94 -> 102\n96 -> 44\n96 -> 7\n100 -> 42\n100 -> 110\n104 -> 3\n104 -> 74\n110 -> 23\n110 -> 17\n\n; endings\n1 {color:#444, shape:dot, label:\u00b7}\n4 {color:#c6531e}\n8 {color:#ffe35f}\n14 {color:#db8e3c}\n17 {color:#95cde5}\n39 {color:#b01700}\n41 {color:#c6531e}\n42 {color:#c6531e}\n43 {color:#db8e3c}\n44 {color:#b01700}\n51 {color:#ffe35f}\n52 {color:#c6531e}\n56 {color:#95cde5}\n62 {color:#c6531e}\n65 {color:#b01700}\n67 {color:#c6531e}\n85 {color:#ffe35f}\n86 {color:#b01700}\n102 {color:#db8e3c}\n103 {color:#db8e3c}\n107 {color:#db8e3c}\n108 {color:#b01700}\n109 {color:#c6531e}\n114 {color:#95cde5}\n117 {color:#ffe35f}","example":"cyoa","title":"Mystery of the Secret Room"},
    'python-grammar': {"_id":"python-grammar","_rev":"1-b51a39ec5ab3eb1fe22191f07fd08afb","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":false},"src":";\n; Grammar of the Python language\n; transcribed from nick siegler's diagram:\n; flickr.com/photos/nicksieger/281055485\n;\n\nfile input -> stmt\nstmt -> compound stmt\nstmt -> simple stmt\nsimple stmt -> small stmt\nsmall stmt -> del\ndel -> exprlist\nsmall stmt -> exec\nsmall stmt -> expr\nexpr -> augassign\nexpr -> testlist\nsmall stmt -> flow\nflow -> return\nflow -> yield\nflow -> continue\nflow -> break\nflow -> raise\nraise -> test\n\nsmall stmt -> pass\nsmall stmt -> print\nsmall stmt -> global\nsmall stmt -> assert\nassert -> test\nsmall stmt -> import\nimport -> import as\nimport -> dotted as\ndotted as -> dotted name\nimport -> dotted name\n\ntest -> lambdef\nlambdef -> test\nlambdef -> varargslist\nvarargslist -> defparameter\ndefparameter -> test\ndefparameter -> fpdef\nfpdef -> fplist\nfplist -> fpdef\n\nexec -> expression\nexpression -> xor\nxor -> and\nand->shift\nshift -> arith\narith -> term\nterm -> factor\nfactor -> power\npower -> factor\npower -> atom\npower -> trailer\ntrailer -> subscriptlist\nsubscriptlist -> subscript\nsubscript -> sliceop\nsliceop -> test\ntrailer -> arglist\narglist -> argument\nargument -> test\narglist -> test\natom -> listmaker\nlistmaker -> list for\nlist for -> exprlist\nlist for -> list iter\nlist iter -> list for\nlist iter -> list if\nlist if -> list iter\nlist if -> test\natom -> dictmaker\ndictmaker -> test\nexec -> test\n\ncompound stmt -> for\nfor -> suite\nfor -> testlist\nfor -> exprlist\ncompound stmt -> classdef\nclassdef -> suite\nclassdef -> testlist\ncompound stmt -> try\ntry -> suite\ntry -> except\ncompound stmt -> if\nif -> suite\nif -> test\ncompound stmt -> while\nwhile -> suite\nwhile -> test\ncompound stmt -> funcdef\nfuncdef -> suite\nfuncdef -> parameters\nparameters -> vararglist","example":"doodle","title":"Python Grammar"},
    'snowflake': {"_id":"snowflake","_rev":"1-b93ed8d24eb7543e10c727c940bd41b2","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":false},"src":"-> {color:#99aaaa, weight:6}\n{color:none, label:}\n\n1 -- 2\n1 -- 3\n1 -- 4\n1 -- 5\n1 -- 6\n\n2 -- 7\n2 -- 8\n2 -- 9\n\n3 -- 10\n3 -- 11\n3 -- 12\n\n4 -- 13\n4 -- 14\n4 -- 15\n\n5 -- 16\n5 -- 17\n5 -- 18\n\n6 -- 19\n6 -- 20\n6 -- 21\n\n","example":"doodle","title":"Snowflake"},
    'the-abominable-snowman': {"_id":"the-abominable-snowman","_rev":"1-cb224d9fc9d466d9e3cc358bbb410cbc","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 13 (1982)\n; The Abominable Snowman\n; by R.A. Montgomery\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n1 -> 7\n1 -> 8\n7 -> 9\n7 -> 13\n8 -> 10\n9 -> 20\n9 -> 15\n10 -> 16\n10 -> 19\n13 -> 14\n14 -> 23\n14 -> 22\n15 -> 32\n16 -> 24\n16 -> 27\n19 -> 28\n19 -> 29\n20 -> 31\n21 -> 46\n21 -> 47\n22 -> 34\n23 -> 33\n23 -> 38\n24 -> 26\n26 -> 40\n26 -> 116\n27 -> 39\n27 -> 42\n31 -> 43\n31 -> 45\n34 -> 21\n38 -> 50\n38 -> 48\n39 -> 52\n39 -> 54\n40 -> 51\n40 -> 63\n43 -> 58\n43 -> 62\n45 -> 57\n45 -> 55\n46 -> 59\n46 -> 64\n48 -> 68\n50 -> 67\n50 -> 65\n51 -> 70\n51 -> 72\n52 -> 24\n55 -> 76\n57 -> 75\n58 -> 77\n58 -> 80\n62 -> 82\n62 -> 81\n65 -> 86\n65 -> 87\n67 -> 85\n67 -> 83\n68 -> 88\n68 -> 89\n70 -> 90\n70 -> 92\n75 -> 73\n76 -> 78\n77 -> 91\n77 -> 95\n78 -> 100\n78 -> 102\n81 -> 110\n82 -> 98\n82 -> 96\n83 -> 99\n86 -> 37\n86 -> 114\n90 -> 92\n91 -> 101\n92 -> 97\n95 -> 106\n97 -> 112\n98 -> 109\n100 -> 104\n101 -> 103\n106 -> 111\n109 -> 60\n110 -> 82\n112 -> 107\n\n; endings\n1 {color:#444, shape:dot, label:\u00b7}\n28 {color:#b01700}\n29 {color:#b01700}\n32 {color:#c6531e}\n33 {color:#b01700}\n37 {color:#db8e3c}\n42 {color:#c6531e}\n47 {color:#ffe35f}\n54 {color:#db8e3c}\n59 {color:#db8e3c}\n60 {color:#95cde5}\n63 {color:#db8e3c}\n64 {color:#ffe35f}\n72 {color:#c6531e}\n73 {color:#db8e3c}\n80 {color:#95cde5}\n85 {color:#95cde5}\n87 {color:#db8e3c}\n88 {color:#c6531e}\n89 {color:#95cde5}\n96 {color:#b01700}\n99 {color:#95cde5}\n102 {color:#ffe35f}\n103 {color:#95cde5}\n104 {color:#95cde5}\n107 {color:#db8e3c}\n111 {color:#95cde5}\n114 {color:#c6531e}\n116 {color:#b01700}","example":"cyoa","title":"The Abominable Snowman"},
    'the-cave-of-time': {"_id":"the-cave-of-time","_rev":"1-b61c63c4e7e2c0fe911f89c1330491e2","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 1 (1979)\n; The Cave of Time\n; by Edward Packard\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n3 -> 4\n3 -> 5\n4 -> 10\n4 -> 8\n5 -> 16\n5 -> 6\n6 -> 114\n6 -> 22\n8 -> 17\n8 -> 18\n10 -> 21\n10 -> 61\n12 -> 66\n12 -> 78\n13 -> 14\n13 -> 15\n16 -> 24\n16 -> 25\n17 -> 26\n17 -> 28\n18 -> 29\n18 -> 30\n21 -> 33\n21 -> 35\n22 -> 36\n22 -> 37\n24 -> 38\n24 -> 40\n25 -> 41\n25 -> 43\n25 -> 44\n25 -> 45\n26 -> 46\n26 -> 47\n29 -> 52\n29 -> 53\n30 -> 54\n30 -> 92\n33 -> 68\n33 -> 79\n35 -> 76\n35 -> 80\n36 -> 37\n37 -> 12\n37 -> 13\n38 -> 82\n38 -> 87\n40 -> 115\n40 -> 83\n47 -> 49\n47 -> 50\n49 -> 25\n54 -> 101\n54 -> 94\n54 -> 98\n61 -> 104\n61 -> 106\n66 -> 70\n66 -> 74\n70 -> 103\n70 -> 72\n79 -> 86\n79 -> 88\n83 -> 84\n83 -> 85\n88 -> 90\n88 -> 91\n92 -> 57\n92 -> 60\n94 -> 100\n94 -> 96\n104 -> 107\n104 -> 109\n106 -> 111\n106 -> 113\n114 -> 61\n\n; endings\n3 {color:#444, shape:dot, label:\u00b7}\n14 {color:#db8e3c}\n15 {color:#db8e3c}\n28 {color:#db8e3c}\n41 {color:#ffe35f}\n43 {color:#95cde5}\n44 {color:#b01700}\n45 {color:#ffe35f}\n46 {color:#c6531e}\n50 {color:#95cde5}\n52 {color:#db8e3c}\n53 {color:#b01700}\n57 {color:#db8e3c}\n60 {color:#b01700}\n68 {color:#c6531e}\n72 {color:#ffe35f}\n74 {color:#c6531e}\n76 {color:#db8e3c}\n78 {color:#b01700}\n80 {color:#b01700}\n82 {color:#b01700}\n84 {color:#b01700}\n85 {color:#ffe35f}\n86 {color:#c6531e}\n87 {color:#b01700}\n90 {color:#95cde5}\n91 {color:#b01700}\n96 {color:#db8e3c}\n98 {color:#ffe35f}\n100 {color:#db8e3c}\n101 {color:#b01700}\n103 {color:#ffe35f}\n107 {color:#db8e3c}\n109 {color:#ffe35f}\n111 {color:#95cde5}\n113 {color:#ffe35f}\n115 {color:#ffe35f}","example":"cyoa","title":"The Cave of Time"},
    'the-cavern-of-doom': {"_id":"the-cavern-of-doom","_rev":"1-ddbdc0a05d3d10ab352850de46d2ef9a","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; WDIDN 3 (1982)\n; Zork: The Cavern of Doom\n; by Steve Meretsky\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n2 -> 7\n7 -> 13\n7 -> 15\n7 -> 19\n7 -> 21\n13 -> 21\n15 -> 21\n19 -> 21\n21 -> 26\n21 -> 31\n26 -> 33\n26 -> 36\n33 -> 38\n33 -> 41\n36 -> 33\n36 -> 43\n38 -> 41\n38 -> 45\n41 -> 48\n41 -> 50\n48 -> 53\n48 -> 57\n50 -> 53\n50 -> 57\n53 -> 56\n53 -> 57\n57 -> 60\n57 -> 62\n62 -> 66\n62 -> 68\n62 -> 71\n66 -> 74\n66 -> 68\n66 -> 71\n74 -> 77\n74 -> 80\n77 -> 82\n77 -> 84\n77 -> 88\n84 -> 91\n84 -> 94\n94 -> 96\n94 -> 100\n96 -> 102\n96 -> 104\n104 -> 113\n104 -> 115\n104 -> 117\n104 -> 119\n\n; endings\n2 {color:#444, shape:dot, label:\u00b7}\n31 {color:#b01700}\n43 {color:#b01700}\n45 {color:#b01700}\n56 {color:#c6531e}\n60 {color:#c6531e}\n68 {color:#c6531e}\n68 {color:#c6531e}\n71 {color:#c6531e}\n71 {color:#c6531e}\n80 {color:#db8e3c}\n82 {color:#db8e3c}\n88 {color:#db8e3c}\n91 {color:#b01700}\n100 {color:#db8e3c}\n102 {color:#ffe35f}\n113 {color:#ffe35f}\n115 {color:#ffe35f}\n117 {color:#ffe35f}\n119 {color:#95cde5}","example":"cyoa","title":"The Cavern of Doom"},
    'the-mystery-of-chimney-rock': {"_id":"the-mystery-of-chimney-rock","_rev":"1-8c39b5bc8543125712714ef7ae9aac60","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 5 (1980)\n; The Mystery of Chimney Rock\n; by Edward Packard\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n3 -> 4\n3 -> 6\n4 -> 5\n5 -> 8\n5 -> 10\n6 -> 7\n7 -> 12\n7 -> 11\n8 -> 14\n8 -> 15\n10 -> 16\n10 -> 17\n11 -> 22\n11 -> 21\n12 -> 19\n12 -> 20\n14 -> 24\n14 -> 25\n15 -> 26\n15 -> 28\n16 -> 27\n16 -> 31\n17 -> 32\n17 -> 34\n19 -> 35\n19 -> 36\n20 -> 37\n20 -> 38\n21 -> 42\n21 -> 41\n22 -> 23\n23 -> 39\n23 -> 40\n24 -> 44\n24 -> 46\n25 -> 48\n25 -> 49\n26 -> 54\n26 -> 50\n27 -> 56\n27 -> 57\n28 -> 52\n28 -> 55\n31 -> 58\n31 -> 59\n32 -> 33\n33 -> 60\n33 -> 61\n34 -> 69\n35 -> 66\n36 -> 66\n36 -> 67\n38 -> 72\n38 -> 73\n39 -> 76\n39 -> 74\n40 -> 77\n40 -> 78\n41 -> 82\n41 -> 83\n42 -> 80\n42 -> 81\n44 -> 45\n45 -> 84\n45 -> 89\n46 -> 47\n48 -> 90\n48 -> 91\n49 -> 50\n50 -> 99\n50 -> 100\n52 -> 53\n53 -> 117\n53 -> 118\n54 -> 71\n56 -> 105\n57 -> 8\n61 -> 48\n61 -> 92\n62 -> 110\n62 -> 85\n63 -> 86\n63 -> 88\n64 -> 93\n64 -> 94\n65 -> 96\n65 -> 95\n66 -> 64\n66 -> 65\n67 -> 68\n68 -> 102\n69 -> 62\n69 -> 63\n71 -> 97\n71 -> 98\n74 -> 81\n74 -> 92\n85 -> 107\n86 -> 37\n88 -> 48\n95 -> 106\n95 -> 108\n97 -> 10\n99 -> 69\n100 -> 101\n102 -> 71\n102 -> 103\n103 -> 25\n106 -> 106\n106 -> 119\n110 -> 111\n110 -> 112\n110 -> 113\n112 -> 114\n112 -> 116\n113 -> 120\n113 -> 121\n\n; endings\n3 {color:#444, shape:dot, label:\u00b7}\n37 {color:#c6531e}\n47 {color:#95cde5}\n55 {color:#b01700}\n58 {color:#db8e3c}\n59 {color:#db8e3c}\n60 {color:#c6531e}\n72 {color:#95cde5}\n73 {color:#95cde5}\n76 {color:#c6531e}\n77 {color:#db8e3c}\n78 {color:#db8e3c}\n80 {color:#c6531e}\n81 {color:#ffe35f}\n81 {color:#ffe35f}\n82 {color:#db8e3c}\n83 {color:#ffe35f}\n84 {color:#b01700}\n86 {color:#c6531e}\n89 {color:#db8e3c}\n90 {color:#c6531e}\n91 {color:#c6531e}\n92 {color:#db8e3c}\n92 {color:#db8e3c}\n93 {color:#db8e3c}\n94 {color:#c6531e}\n96 {color:#c6531e}\n98 {color:#b01700}\n101 {color:#db8e3c}\n105 {color:#db8e3c}\n107 {color:#db8e3c}\n108 {color:#b01700}\n111 {color:#ffe35f}\n114 {color:#db8e3c}\n116 {color:#ffe35f}\n117 {color:#db8e3c}\n118 {color:#b01700}\n119 {color:#c6531e}\n120 {color:#ffe35f}\n121 {color:#95cde5}","example":"cyoa","title":"The Mystery of Chimney Rock"},
    'the-mystery-of-ura-senke': {"_id":"the-mystery-of-ura-senke","_rev":"1-28db4e79a6f7791829b7e2a9679b76b3","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 44 (1985)\n; The Mystery of Ura Senke\n; by Shannon Gilligan\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n1 -> 11\n1 -> 9\n7 -> 33\n7 -> 29\n9 -> 20\n9 -> 15\n11 -> 14\n11 -> 28\n14 -> 7\n14 -> 25\n14 -> 28\n15 -> 26\n15 -> 22\n20 -> 95\n20 -> 89\n22 -> 44\n22 -> 39\n25 -> 40\n25 -> 37\n26 -> 51\n26 -> 46\n28 -> 94\n28 -> 84\n33 -> 76\n33 -> 70\n37 -> 47\n37 -> 49\n40 -> 56\n40 -> 55\n46 -> 58\n46 -> 62\n49 -> 65\n49 -> 59\n65 -> 111\n65 -> 114\n70 -> 77\n70 -> 79\n76 -> 91\n76 -> 96\n79 -> 86\n79 -> 90\n94 -> 110\n94 -> 104\n96 -> 66\n96 -> 52\n\n; endings\n1 {color:#444, shape:dot, label:\u00b7}\n29 {color:#db8e3c}\n39 {color:#c6531e}\n44 {color:#b01700}\n47 {color:#db8e3c}\n51 {color:#db8e3c}\n52 {color:#95cde5}\n55 {color:#b01700}\n56 {color:#b01700}\n58 {color:#b01700}\n59 {color:#b01700}\n62 {color:#db8e3c}\n66 {color:#db8e3c}\n77 {color:#ffe35f}\n84 {color:#95cde5}\n86 {color:#b01700}\n89 {color:#95cde5}\n90 {color:#ffe35f}\n91 {color:#c6531e}\n95 {color:#95cde5}\n104 {color:#95cde5}\n110 {color:#c6531e}\n111 {color:#c6531e}\n114 {color:#db8e3c}","example":"cyoa","title":"The Mystery of Ura Senke"},
    'third-planet-from-altair': {"_id":"third-planet-from-altair","_rev":"1-ee5599bcde8a1592f71eb00281360dd6","sys":{"repulsion":2600,"friction":0.5,"stiffness":512,"gravity":true},"src":";\n; CYOA 7 (1980)\n; Third Planet from Altair\n; by Edward Packard\n;\n; Each node is a page in the book, with\n; the lines between them representing \n; choices. The first page is drawn in\n; black and marked with a dot.\n;\n; Pages that contain an ending are color- \n; coded based on the goodness of that \n; ending. red is catastrophic, warm colors \n; are of varying levels of mediocrity, and \n; blue is the ideal, \u2018winning\u2019 ending.\n;\n\n; don\u2019t color in the decision pages\n{color:none}\n\n; choices\n5 -> 6\n5 -> 8\n6 -> 9\n6 -> 10\n6 -> 13\n7 -> 46\n7 -> 48\n8 -> 12\n8 -> 22\n9 -> 14\n9 -> 15\n9 -> 16\n10 -> 17\n10 -> 19\n12 -> 24\n12 -> 25\n13 -> 20\n13 -> 34\n14 -> 26\n14 -> 27\n15 -> 101\n16 -> 30\n16 -> 33\n17 -> 28\n17 -> 32\n19 -> 35\n19 -> 36\n20 -> 38\n22 -> 44\n22 -> 45\n25 -> 42\n25 -> 43\n27 -> 49\n27 -> 50\n28 -> 79\n30 -> 41\n30 -> 51\n34 -> 21\n34 -> 40\n35 -> 101\n36 -> 54\n36 -> 58\n38 -> 7\n38 -> 59\n41 -> 53\n41 -> 109\n43 -> 10\n44 -> 61\n44 -> 64\n45 -> 55\n45 -> 60\n46 -> 27\n48 -> 65\n48 -> 67\n51 -> 15\n54 -> 74\n54 -> 75\n55 -> 57\n58 -> 77\n58 -> 78\n60 -> 62\n60 -> 69\n61 -> 83\n61 -> 84\n64 -> 86\n64 -> 89\n67 -> 12\n70 -> 106\n70 -> 107\n72 -> 108\n72 -> 111\n75 -> 91\n75 -> 92\n77 -> 80\n77 -> 82\n80 -> 110\n82 -> 93\n82 -> 94\n85 -> 88\n85 -> 103\n88 -> 112\n88 -> 116\n92 -> 97\n92 -> 98\n92 -> 102\n94 -> 99\n94 -> 100\n98 -> 70\n98 -> 72\n99 -> 105\n101 -> 85\n101 -> 90\n105 -> 113\n105 -> 114\n109 -> 34\n112 -> 104\n112 -> 116\n\n; endings\n5 {color:#444, shape:dot, label:\u00b7}\n21 {color:#b01700}\n24 {color:#b01700}\n26 {color:#b01700}\n32 {color:#c6531e}\n33 {color:#c6531e}\n40 {color:#db8e3c}\n42 {color:#c6531e}\n49 {color:#b01700}\n50 {color:#db8e3c}\n53 {color:#b01700}\n57 {color:#ffe35f}\n59 {color:#b01700}\n62 {color:#b01700}\n65 {color:#95cde5}\n69 {color:#db8e3c}\n74 {color:#b01700}\n78 {color:#ffe35f}\n79 {color:#ffe35f}\n83 {color:#b01700}\n84 {color:#95cde5}\n86 {color:#ffe35f}\n89 {color:#b01700}\n90 {color:#b01700}\n91 {color:#db8e3c}\n93 {color:#b01700}\n97 {color:#c6531e}\n100 {color:#ffe35f}\n102 {color:#95cde5}\n103 {color:#95cde5}\n104 {color:#b01700}\n106 {color:#b01700}\n107 {color:#ffe35f}\n108 {color:#ffe35f}\n110 {color:#95cde5}\n111 {color:#ffe35f}\n113 {color:#ffe35f}\n114 {color:#ffe35f}\n116 {color:#95cde5}","example":"cyoa","title":"Third Planet from Altair"}
  };

  var HalfViz = function(elt){
    var dom = $(elt)

    sys = arbor.ParticleSystem(2600, 512, 0.5)
    sys.renderer = Renderer("#viewport") // our newly created renderer will have its .init() method called shortly by sys...
    sys.screenPadding(20)
    
    var _ed = dom.find('#editor')
    var _code = dom.find('textarea')
    var _canvas = dom.find('#viewport').get(0)
    var _grabber = dom.find('#grabber')
    
    var _updateTimeout = null
    var _current = null // will be the id of the doc if it's been saved before
    var _editing = false // whether to undim the Save menu and prevent navigating away
    var _failures = null
    
    var that = {
      dashboard:Dashboard("#dashboard", sys),
      io:IO("#editor .io"),
      init:function(){
        
        $(window).resize(that.resize)
        that.resize()
        that.updateLayout(Math.max(1, $(window).width()-340))

        _code.keydown(that.typing)
        _grabber.bind('mousedown', that.grabbed)

        $(that.io).bind('get', that.getDoc)
        $(that.io).bind('clear', that.newDoc)
        return that
      },
      
      getDoc:function(e){
        //$.getJSON('library/'+e.id+'.json', function(doc){

          // update the system parameters
          var doc = DOCS[e.id];
          if (doc.sys){
            sys.parameters(doc.sys)
            that.dashboard.update()
          }

          // modify the graph in the particle system
          _code.val(doc.src)
          that.updateGraph()
          that.resize()
          _editing = false
        //})
        
      },

      newDoc:function(){
        var lorem = "; some example nodes\nhello {color:red, label:HELLO}\nworld {color:orange}\n\n; some edges\nhello -> world {color:yellow}\nfoo -> bar {weight:5}\nbar -> baz {weight:2}"
        
        _code.val(lorem).focus()
        $.address.value("")
        that.updateGraph()
        that.resize()
        _editing = false
      },

      updateGraph:function(e, shouldApplyTextAreaChangesToAppbase){
        var src_txt = _code.val()
        var network = parse(src_txt)
        $.each(network.nodes, function(nname, ndata){
          if (ndata.label===undefined) ndata.label = nname
        })
        sys.merge(network)
        _updateTimeout = null

        if (shouldApplyTextAreaChangesToAppbase === true) {
          that.applyTextAreaChangesToAppbase();
        }
      },
      
      resize:function(){        
        var w = $(window).width() - 40
        var x = w - _ed.width()
        that.updateLayout(x)
        sys.renderer.redraw()
      },
      
      updateLayout:function(split){
        var w = dom.width()
        var h = _grabber.height()
        var split = split || _grabber.offset().left
        var splitW = _grabber.width()
        _grabber.css('left',split)

        var edW = w - split
        var edH = h
        _ed.css({width:edW, height:edH})
        if (split > w-20) _ed.hide()
        else _ed.show()

        var canvW = split - splitW
        var canvH = h
        _canvas.width = canvW
        _canvas.height = canvH
        sys.screenSize(canvW, canvH)
                
        _code.css({height:h-20,  width:edW-4, marginLeft:2})
      },
      
      grabbed:function(e){
        $(window).bind('mousemove', that.dragged)
        $(window).bind('mouseup', that.released)
        return false
      },
      dragged:function(e){
        var w = dom.width()
        that.updateLayout(Math.max(10, Math.min(e.pageX-10, w)) )
        sys.renderer.redraw()
        return false
      },
      released:function(e){
        $(window).unbind('mousemove', that.dragged)
        return false
      },
      typing:function(e){
        var c = e.keyCode
        if ($.inArray(c, [37, 38, 39, 40, 16])>=0){
          return
        }
        
        if (!_editing){
          $.address.value("")
        }
        _editing = true
        
        if (_updateTimeout) clearTimeout(_updateTimeout)
        _updateTimeout = setTimeout(function(){
          that.updateGraph(null, true);
        }, 900)
      }
    }
    
    return that.init()
  }


  $(document).ready(function(){
    var mcp = HalfViz("#halfviz"),
        vertexName = function(vertex) {
          return vertex.path().split('/').slice(-1).pop();
        },
        VERTEX_APPBASE = {},
        EDGE_APPBASE = {},
        NAMESPACE = "graphfoo",
        removeVertex = function(vertex) {
          var name = vertexName(vertex);
          delete VERTEX_APPBASE[name];
          delete EDGE_APPBASE[name];
          $.each( EDGE_APPBASE, function(edge) {
            delete EDGE_APPBASE[edge][name];
          });
        },
        dataListener = function(vertex) {
          var name = vertexName(vertex);
          vertex.on('properties', function(err, vertex, data) {
            VERTEX_APPBASE[name] = data.properties();
            showAppbaseInfo();
          });
        },
        edgeListener = function(vertex) {
          vertex.on('edge_added', function(err, linkedVertex) {
            var nameVertex = vertexName(vertex),
                nameLinkedVertex = vertexName(linkedVertex),
                edge = {};

            edge[nameVertex] = EDGE_APPBASE[nameVertex] || {};
            edge[nameVertex][nameLinkedVertex] = {directed: true};
            $.extend( EDGE_APPBASE, edge );

            addListeners(linkedVertex);
            showAppbaseInfo();
          });

          vertex.on('edge_removed', function(err, linkedVertex){
            var nameVertex = vertexName(vertex),
                nameLinkedVertex = vertexName(linkedVertex);
            delete EDGE_APPBASE[nameVertex][nameLinkedVertex];
            showAppbaseInfo();
          });
        },
        addListeners = function(vertex) {
          var name = vertexName(vertex);
          if (VERTEX_APPBASE[name]) {
            return;
          }

          VERTEX_APPBASE[name] = {};
          dataListener(vertex);
          edgeListener(vertex);
          showAppbaseInfo();
        },
        stringfyNodes = function( VERTEX_APPBASE ) {
          var str = "";
          $.each( VERTEX_APPBASE, function(key, value) {
            str += key + " {";
            $.each( value, function(key, value) {
              str += key + ":" + value + ", "
            } );
            Object.keys(value).length && (str = str.slice(0,-2));
            str += "}\n"
          } );
          return str;
        },
        stringfyEdges = function( EDGE_APPBASE ) {
          var str = "";
          $.each( EDGE_APPBASE, function(vertex, edges) {
            $.each( edges, function(edge, value) {
              str += vertex + " -> " + edge + "\n";
            } );
          } );
          return str;
        },
        stringfy = function( EDGE_APPBASE, VERTEX_APPBASE ) {
          return stringfyEdges(EDGE_APPBASE) + "\n" + stringfyNodes(VERTEX_APPBASE);
        },
        showAppbaseInfo = function() {
          $('#code').val( stringfy( EDGE_APPBASE, VERTEX_APPBASE ) );
          mcp.updateGraph(null, false);
        };

    mcp.applyTextAreaChangesToAppbase = function() {
      var src_txt = $('#code').val(),
          network = parse(src_txt),
          diffEdge = $.diff(EDGE_APPBASE, network.edges ),
          diffVertex = $.diff(VERTEX_APPBASE, network.nodes );

      $.each( diffEdge.add, function(vertex, linkedVertexes) {
        var vref = Appbase.ns(NAMESPACE).v(vertex);
        $.each(linkedVertexes, function(linkedVertex) {
           var lvref = Appbase.ns(NAMESPACE).v(linkedVertex);
           vref.setEdge( linkedVertex, lvref );
        } );
      } );

      $.each( diffEdge.del, function(vertex, linkedVertexes) {
        var vref = Appbase.ns(NAMESPACE).v(vertex);
        $.each(linkedVertexes, function(linkedVertex) {
           var lvref = Appbase.ns(NAMESPACE).v(linkedVertex);
           vref.removeEdge( linkedVertex );
        } );
      } );

      $.each( diffVertex.add, function(vertex, data) {
        Appbase.ns(NAMESPACE).v(vertex).setData( data );
      } );

      $.each( diffVertex.mod, function(vertex, data) {
        Appbase.ns(NAMESPACE).v(vertex).setData( data );
      } );

      $.each( diffVertex.del, function(vertex) {
        Appbase.ns(NAMESPACE).v(vertex).destroy();
      } );
    };

    Appbase.credentials("graphviz", "d3d66439a98a0cac8a4cf6bcf3546110")
    //$.address.value() || 'Users'
    Appbase.ns(NAMESPACE).on('vertex_added', function(err, vertex){
      addListeners(vertex);
    });
    Appbase.ns(NAMESPACE).on('vertex_removed', function(err, vertex) {
      removeVertex(vertex);
    });

    window.VERTEX_APPBASE = VERTEX_APPBASE;
    window.EDGE_APPBASE = EDGE_APPBASE;
    window.stringfy = stringfy;
  });

})()
