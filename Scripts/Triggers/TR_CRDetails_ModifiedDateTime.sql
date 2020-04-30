GO

/****** Object:  Trigger [dbo].[TR_CRDetails_ModifiedDateTime]    Script Date: 30 Apr 2020 9:56:21 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create TRIGGER [dbo].[TR_CRDetails_ModifiedDateTime]
ON [dbo].[CRDetails]
AFTER UPDATE
AS
    UPDATE [dbo].[CRDetails]
    SET modified = GETDATE()
    WHERE CR_ID IN (SELECT DISTINCT CR_ID FROM Inserted)

	
GO

ALTER TABLE [dbo].[CRDetails] ENABLE TRIGGER [TR_CRDetails_ModifiedDateTime]
GO


