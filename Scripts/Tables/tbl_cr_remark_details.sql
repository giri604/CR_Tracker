GO

/****** Object:  Table [dbo].[tbl_cr_remark_details] 
 -----------Created By Ajay Bind-------------------
 Script Date: 30-Apr-20 7:25:52 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[tbl_cr_remark_details](
	[CR_Remark_ID] [int] IDENTITY(1,1) NOT NULL,
	[Ref_CR_ID] [int] NULL,
	[CR_Remark] [nvarchar](max) NULL,
	[CR_Remark_Saved_By] [varchar](250) NULL,
	[CR_Remark_Saved_Date] [datetime] NULL,
	[CR_Remark_Updated_By] [varchar](250) NULL,
	[CR_Remark_Updated_Date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[CR_Remark_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


