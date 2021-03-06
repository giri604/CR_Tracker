/****** Object:  Table [dbo].[CRAttachFiles]    Script Date: 20 Apr 2020 5:08:55 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CRAttachFiles](
	[FileID] [int] IDENTITY(1,1) NOT NULL,
	[CR_ID] [int] NULL,
	[FileName] [varchar](55) NULL,
	[ContentType] [nvarchar](255) NULL,
	[AttachDocument] [varbinary](max) NULL,
	[CreatedDate] [datetime2](3) NULL,
	[ModifiedDateTime] [datetime2](3) NULL,
 CONSTRAINT [PK_CRAttachFiles] PRIMARY KEY CLUSTERED 
(
	[FileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[CRAttachFiles] ADD  CONSTRAINT [DF_CRAttachFiles_CreatedDate]  DEFAULT (sysdatetime()) FOR [CreatedDate]
GO
