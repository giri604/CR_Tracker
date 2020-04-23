using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CR_Details.Models
{
    public class CRAttachFiles
    {
        public int SrNo { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public byte[] AttachDocument { get; set; }
    }
}