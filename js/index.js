(function () {
  console.log('=----check system requirements----=')
  console.log(JSON.stringify(window.ZoomMtg.checkSystemRequirements()))
  window.ZoomMtg.preLoadWasm()
  window.ZoomMtg.prepareJssdk()

  document.getElementById('join_meeting').addEventListener('click', function (e) {
    e.preventDefault()

    if (!document.getElementById('meeting_number').value) {
      return window.alert('Enter meeting number')
    }

    if (!document.getElementById('display_name').value) {
      return window.alert('Enter display name')
    }

    var meetingNumber = document.getElementById('meeting_number').value.replace(/-/g, '')

    var data = {
      meetingNumber: meetingNumber,
      role: 0
    }

    window.fetch('https://zoomsignature.netlify.com/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        var meetConfig = {
          apiKey: 'lsL8ebODSWusCYlgEz-0uw',
          signature: data.signature,
          meetingNumber: parseInt(meetingNumber, 10),
          userName: document.getElementById('display_name').value,
          passWord: '',
          leaveUrl: 'https://zoom.us',
          role: 0
        }

        window.ZoomMtg.init({
          leaveUrl: 'https://nami.org/',
          isSupportAV: true,
          success: function () {
            window.ZoomMtg.join(
              {
                meetingNumber: meetConfig.meetingNumber,
                userName: meetConfig.userName,
                signature: meetConfig.signature,
                apiKey: meetConfig.apiKey,
                userEmail: 'info@nami.org',
                passWord: meetConfig.passWord,
                success: function (res) {
                  console.log('join meeting success')
                },
                error: function (res) {
                  console.log(res)
                }
              }
            )
          },
          error: function (res) {
            console.log(res)
          }
        })
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
})()
