using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CR_Details.Models
{
    public class CRAttachFiles
    {
        [Key]
        public int FileID { get; set; }
        public int CR_ID { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public byte[] AttachDocument { get; set; }
    }
}