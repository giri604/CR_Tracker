GO

/****** Object:  Trigger [dbo].[TR_CRAttachFiles_ModifiedDateTime]    Script Date: 30 Apr 2020 9:57:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER [dbo].[TR_CRAttachFiles_ModifiedDateTime]
ON [dbo].[CRAttachFiles]
AFTER UPDATE
AS
    UPDATE [dbo].[CRAttachFiles]
    SET ModifiedDateTime = GETDATE()
    WHERE FileID IN (SELECT DISTINCT FileID FROM Inserted)
GO

ALTER TABLE [dbo].[CRAttachFiles] ENABLE TRIGGER [TR_CRAttachFiles_ModifiedDateTime]
GO


