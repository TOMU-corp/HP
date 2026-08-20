(function () {
  var KEY = 'tomu_site_auth_v1';
  var ID = 'user';
  var PASS = 'user';

  document.documentElement.style.visibility = 'hidden';

  function reveal() {
    document.documentElement.style.visibility = 'visible';
  }

  var authed = false;
  try {
    authed = sessionStorage.getItem(KEY) === '1';
  } catch (e) {}

  if (authed) {
    reveal();
    return;
  }

  function showGate() {
    var overlay = document.createElement('div');
    overlay.id = 'gate-overlay';
    overlay.style.cssText =
      'position:fixed;inset:0;background:#1b1b1b;color:#fff;display:flex;' +
      'align-items:center;justify-content:center;flex-direction:column;' +
      'font-family:sans-serif;z-index:999999;';
    overlay.innerHTML =
      '<form id="gate-form" style="text-align:center;background:#262626;padding:32px 40px;border-radius:8px;">' +
      '<p style="margin:0 0 16px;font-size:15px;">このサイトはパスワードで保護されています</p>' +
      '<div style="margin-bottom:10px;">' +
      '<input type="text" id="gate-id" placeholder="ID" autocomplete="off" style="padding:8px 10px;font-size:14px;border-radius:4px;border:1px solid #ccc;width:160px;">' +
      '</div>' +
      '<div style="margin-bottom:14px;">' +
      '<input type="password" id="gate-pw" placeholder="PASSWORD" autocomplete="off" style="padding:8px 10px;font-size:14px;border-radius:4px;border:1px solid #ccc;width:160px;">' +
      '</div>' +
      '<button type="submit" style="padding:8px 20px;font-size:14px;border-radius:4px;border:none;background:#4a7c59;color:#fff;cursor:pointer;">入室</button>' +
      '<p id="gate-error" style="color:#ff8080;margin:12px 0 0;font-size:13px;visibility:hidden;">IDまたはパスワードが違います</p>' +
      '</form>';

    document.body.appendChild(overlay);
    document.documentElement.style.visibility = 'visible';

    document.getElementById('gate-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var id = document.getElementById('gate-id').value;
      var pw = document.getElementById('gate-pw').value;
      if (id === ID && pw === PASS) {
        try {
          sessionStorage.setItem(KEY, '1');
        } catch (e) {}
        overlay.remove();
      } else {
        document.getElementById('gate-error').style.visibility = 'visible';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', showGate);
})();
