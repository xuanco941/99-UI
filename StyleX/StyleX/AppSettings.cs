using Microsoft.Extensions.Options;
using System.Globalization;

namespace StyleX
{
    public class EmailAppSetting
    {
        public string username { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }

    public class AppSettings
    {
        private readonly IOptions<EmailAppSetting> _emailAppSetting;
        public AppSettings(IOptions<EmailAppSetting> emailAppSetting)
        {
            _emailAppSetting = emailAppSetting;
        }
        public EmailAppSetting Email
        {
            get
            {
                if(!string.IsNullOrEmpty(_emailAppSetting.Value.username) && !string.IsNullOrEmpty(_emailAppSetting.Value.password))
                {
                    return _emailAppSetting.Value;
                }
                else
                {
                    return new EmailAppSetting();
                }
               
            }
        }
    }
}
