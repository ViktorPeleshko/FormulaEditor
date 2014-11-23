  // конфігувації MathJax
   MathJax.Hub.Config({
                tex2jax: {
                inlineMath: [["$","$"],["\\(","\\)"]]
              }
              });
   //
      //  Use a closure to hide the local variables from the
      //  global namespace
      //
      (function () {
        var QUEUE = MathJax.Hub.queue;  // shorthand for the queue
        var math = null;                // the element jax for the math output.

        //
        //  Get the element jax when MathJax has produced it.
        //
        QUEUE.Push(function () {
          math = MathJax.Hub.getAllJax("MathOutput")[0];

        });

        //
        //  The onchange event handler that typesets the
        //  math entered by the user
        //
        window.UpdateMath = function (TeX) {
          QUEUE.Push(["Text",math,"\\displaystyle{"+TeX+"}"]);
          console.log("UpdateMath");
        }
      })();



// функція для вставлення тексту у місце де знаходиться курсор
  function insertTextAtCursor(el, text, offset) {
    var val = el.value, endIndex, range, doc = el.ownerDocument;
    if (typeof el.selectionStart == "number"
            && typeof el.selectionEnd == "number") {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length+(offset?offset:0);
    } else if (doc.selection != "undefined" && doc.selection.createRange) {
        el.focus();
        range = doc.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
}


// функція для додавання знаку сумми у текстове поле      
$('button').click(function () {
        insertTextAtCursor(document.getElementById('MathInput'), this.value);
        UpdateMath(document.getElementById('MathInput').value);
    });
   

 