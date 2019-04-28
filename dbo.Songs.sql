CREATE TABLE [dbo].[Songs] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [_artist]      NVARCHAR (MAX) NOT NULL,
    [AlbumTitle]   NVARCHAR (MAX) NULL,
    [SongTitle]    NVARCHAR (MAX) NOT NULL,
    [SongFile]     NVARCHAR (MAX) NOT NULL,
    [PlaylistName] NVARCHAR (MAX) NOT NULL,
    [SongFreq]     INT            DEFAULT ((0)) NULL,
    CONSTRAINT [PK_Songs] PRIMARY KEY CLUSTERED ([Id] ASC)
);

