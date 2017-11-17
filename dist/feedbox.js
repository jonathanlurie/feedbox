(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.feedbox = {})));
}(this, (function (exports) { 'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/*
* Author    Jonathan Lurie - http://me.jonahanlurie.fr
* License   MIT
* Link      https://github.com/jonathanlurie/feedblock
* Lab       MCIN - http://mcin.ca/ - Montreal Neurological Institute
*/

var Feedbox = function () {
  function Feedbox(yourEmail) {
    classCallCheck(this, Feedbox);

    this._yourEmail = yourEmail;
    this._buildForm();
  }

  createClass(Feedbox, [{
    key: "_buildForm",
    value: function _buildForm() {
      var that = this;

      var wrapperDiv = document.createElement('div');

      var width = 250;
      var height = 300;
      var space = 5;

      var bottomWhenHidden = height * -1 + 20;
      var bottomWhenShown = -48;

      // wrapperDiv.appendChild
      wrapperDiv.style.zIndex = 1000000;
      wrapperDiv.style.width = width;
      wrapperDiv.style.height = height;
      wrapperDiv.style.position = "fixed";
      wrapperDiv.style.left = 0;
      wrapperDiv.style.margin = 10;
      wrapperDiv.style.bottom = bottomWhenHidden;
      wrapperDiv.style.backgroundColor = "rgb(134, 208, 201)";
      wrapperDiv.style.padding = space;
      wrapperDiv.style.cursor = "pointer";
      wrapperDiv.style.transition = "all 0.2s";
      wrapperDiv.style.userSelect = "none";
      wrapperDiv.style.webkitUserSelect = "none";
      wrapperDiv.style.mozUserSelect = "none";
      wrapperDiv.style.msUserSelect = "none";
      wrapperDiv.folded = true;
      document.body.appendChild(wrapperDiv);

      // top div
      var nameDiv = document.createElement('div');
      nameDiv.style.width = "100%";
      nameDiv.style.height = 30;
      nameDiv.style.marginBottom = 5;
      nameDiv.style.fontSize = "1.8em";
      nameDiv.style.fontWeight = 900;
      nameDiv.style.textTransform = "uppercase";
      nameDiv.style.color = "#FFF";
      nameDiv.style.textAlign = "center";
      nameDiv.style.fontFamily = "sans-serif";
      nameDiv.innerHTML = "feedbox";
      wrapperDiv.appendChild(nameDiv);

      nameDiv.addEventListener("click", function (e) {
        if (wrapperDiv.folded) {
          wrapperDiv.style.bottom = bottomWhenShown;
          wrapperDiv.folded = false;
        } else {
          wrapperDiv.style.bottom = bottomWhenHidden;
          wrapperDiv.folded = true;
        }
      });

      // form
      var inputEmail = document.createElement('input');
      var content = document.createElement('textarea');
      var submitBt = document.createElement('div');

      inputEmail.type = "email";
      inputEmail.name = "email";
      inputEmail.placeholder = "Your email";
      content.name = "message";
      content.placeholder = "Your message";
      //submitBt.type = "submit";
      submitBt.innerHTML = "SEND";
      wrapperDiv.appendChild(inputEmail);
      wrapperDiv.appendChild(content);
      wrapperDiv.appendChild(submitBt);

      inputEmail.style.width = "100%";
      inputEmail.style.border = "none";
      inputEmail.style.height = 25;
      inputEmail.style.backgroundColor = "#FFF";
      inputEmail.style.fontFamily = "sans-serif";
      inputEmail.style.marginBottom = space;
      inputEmail.style.padding = 5;
      content.style.width = "100%";
      content.style.border = "none";
      content.style.marginBottom = space;
      content.style.resize = "none";
      content.rows = 10;
      content.style.backgroundColor = "#FFF";
      content.style.padding = 5;
      submitBt.style.width = "100%";
      submitBt.style.height = 22;
      submitBt.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      submitBt.style.paddingTop = 7;
      submitBt.style.textAlign = "center";
      submitBt.style.color = "#FFF";
      submitBt.style.fontFamily = "sans-serif";
      submitBt.style.fontSize = "1em";
      submitBt.style.fontWeight = "900";
      submitBt.style.marginBottom = space;

      submitBt.addEventListener("mouseover", function (e) {
        submitBt.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      });

      submitBt.addEventListener("mouseleave", function (e) {
        submitBt.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      });

      function successSending() {
        nameDiv.click();
        content.value = "";
        inputEmail.value = "";
        alert("Your message was sent!");
      }

      function failSending() {
        nameDiv.click();
        alert("The message could not be sent.\nAre you sure the email address is correct?");
      }

      submitBt.addEventListener("click", function (e) {
        var data = {
          message: content.value,
          email: inputEmail.value,
          url: window.location.href
        };

        if (data.email == "") {
          failSending();
          return;
        }

        console.log(data);

        var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
        xmlhttp.open("POST", "http://formspree.io/" + that._yourEmail);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(data));

        xmlhttp.onreadystatechange = function () {
          console.log(this);
          if (this.readyState == 4) {

            if (this.status == 200) {
              console.log("SENT OK");
              successSending();
            } else {
              console.warn("ERROR");
              failSending();
            }
          } else {
            console.warn('still waiting...');
          }
        };
      });
    }
  }]);
  return Feedbox;
}();

// but we just want to make it accessible:

exports.Feedbox = Feedbox;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=feedbox.js.map
